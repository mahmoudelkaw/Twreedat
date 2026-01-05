import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

const admin = new Hono<{ Bindings: Bindings }>();

// Get analytics
admin.get('/analytics', async (c) => {
  const { DB } = c.env;

  // Total orders
  const totalOrders = await DB.prepare('SELECT COUNT(*) as count FROM orders').first();

  // Total revenue
  const totalRevenue = await DB.prepare('SELECT SUM(total_amount) as sum FROM orders').first();

  // Total users
  const totalUsers = await DB.prepare(
    "SELECT COUNT(*) as count FROM users WHERE user_type != 'admin'"
  ).first();

  // Pending orders
  const pendingOrders = await DB.prepare(
    "SELECT COUNT(*) as count FROM orders WHERE status = 'pending'"
  ).first();

  // Top products
  const topProducts = await DB.prepare(
    `
    SELECT 
      oi.product_id,
      p.name_ar as product_name_ar,
      p.name_en as product_name_en,
      SUM(oi.quantity) as total_quantity,
      SUM(oi.subtotal) as total_revenue
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    GROUP BY oi.product_id, p.name_ar, p.name_en
    ORDER BY total_revenue DESC
    LIMIT 10
  `
  ).all();

  return c.json({
    success: true,
    data: {
      total_orders: totalOrders?.count || 0,
      total_revenue: totalRevenue?.sum || 0,
      total_users: totalUsers?.count || 0,
      pending_orders: pendingOrders?.count || 0,
      top_products: topProducts.results,
    },
  });
});

// Get all users
admin.get('/users', async (c) => {
  const { DB } = c.env;
  const type = c.req.query('type');

  let query = `
    SELECT 
      id, email, user_type, status, full_name, phone,
      company_name, commercial_registration, tax_id, created_at
    FROM users
    WHERE user_type != 'admin'
  `;

  const params: any[] = [];

  if (type) {
    query += ' AND user_type = ?';
    params.push(type);
  }

  query += ' ORDER BY created_at DESC';

  const result = await DB.prepare(query).bind(...params).all();

  return c.json({ success: true, data: result.results });
});

// Get user by ID
admin.get('/users/:userId', async (c) => {
  const { DB } = c.env;
  const userId = c.req.param('userId');

  const user = await DB.prepare(
    `
    SELECT 
      id, email, user_type, status, full_name, phone,
      company_name, commercial_registration, tax_id, address, created_at
    FROM users
    WHERE id = ?
  `
  )
    .bind(userId)
    .first();

  if (!user) {
    return c.json({ success: false, error: 'User not found' }, 404);
  }

  return c.json({ success: true, data: user });
});

// Get user orders
admin.get('/users/:userId/orders', async (c) => {
  const { DB } = c.env;
  const userId = c.req.param('userId');

  const orders = await DB.prepare(
    `
    SELECT * FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
  `
  )
    .bind(userId)
    .all();

  return c.json({ success: true, data: orders.results });
});

// Update user status
admin.put('/users/:userId/:action', async (c) => {
  const { DB } = c.env;
  const userId = c.req.param('userId');
  const action = c.req.param('action');

  let status: string;
  if (action === 'approve') {
    status = 'active';
  } else if (action === 'suspend') {
    status = 'suspended';
  } else if (action === 'activate') {
    status = 'active';
  } else {
    return c.json({ success: false, error: 'Invalid action' }, 400);
  }

  await DB.prepare('UPDATE users SET status = ? WHERE id = ?').bind(status, userId).run();

  return c.json({ success: true, message: `User ${action}d successfully` });
});

// Get all orders
admin.get('/orders', async (c) => {
  const { DB } = c.env;
  const status = c.req.query('status');

  let query = `
    SELECT 
      o.*,
      u.email as user_email,
      u.full_name as user_name
    FROM orders o
    JOIN users u ON o.user_id = u.id
  `;

  const params: any[] = [];

  if (status) {
    query += ' WHERE o.status = ?';
    params.push(status);
  }

  query += ' ORDER BY o.created_at DESC';

  const result = await DB.prepare(query).bind(...params).all();

  return c.json({ success: true, data: result.results });
});

// Get order by ID
admin.get('/orders/:orderId', async (c) => {
  const { DB } = c.env;
  const orderId = c.req.param('orderId');

  const order = await DB.prepare(
    `
    SELECT 
      o.*,
      u.email as user_email,
      u.full_name as user_name,
      u.phone as user_phone
    FROM orders o
    JOIN users u ON o.user_id = u.id
    WHERE o.id = ?
  `
  )
    .bind(orderId)
    .first();

  if (!order) {
    return c.json({ success: false, error: 'Order not found' }, 404);
  }

  // Get order items
  const items = await DB.prepare('SELECT * FROM order_items WHERE order_id = ?')
    .bind(orderId)
    .all();

  return c.json({
    success: true,
    data: {
      ...order,
      items: items.results,
    },
  });
});

// Update order status
admin.put('/orders/:orderId/status', async (c) => {
  const { DB } = c.env;
  const orderId = c.req.param('orderId');
  const { status } = await c.req.json();

  const validStatuses = ['pending', 'confirmed', 'processing', 'delivered', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return c.json({ success: false, error: 'Invalid status' }, 400);
  }

  await DB.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
    .bind(status, orderId)
    .run();

  return c.json({ success: true, message: 'Order status updated successfully' });
});

export default admin;
