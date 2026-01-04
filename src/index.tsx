import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Simple password hashing (in production, use proper bcrypt)
function hashPassword(password: string): string {
  return `$2a$10$${password}` // Simplified for MVP
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// Generate order number
function generateOrderNumber(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
}

// Calculate price based on quantity and tiers
async function calculatePrice(db: D1Database, productId: number, quantity: number) {
  const product = await db.prepare('SELECT * FROM products WHERE id = ?').bind(productId).first()
  
  if (!product) {
    return null
  }

  // Get applicable price tier
  const tier = await db.prepare(`
    SELECT * FROM price_tiers 
    WHERE product_id = ? 
    AND min_quantity <= ? 
    AND (max_quantity IS NULL OR max_quantity >= ?)
    ORDER BY min_quantity DESC 
    LIMIT 1
  `).bind(productId, quantity, quantity).first()

  const unitPrice = tier ? Number(tier.price_per_unit) : Number(product.base_price)
  const discount = tier ? Number(tier.discount_percentage) : 0

  return {
    productId,
    quantity,
    unitPrice,
    discount,
    subtotal: unitPrice * quantity,
    tierName: tier ? { en: tier.tier_name_en, ar: tier.tier_name_ar } : null
  }
}

// ==========================================
// PUBLIC API ROUTES
// ==========================================

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', message: 'Twreedat API is running' })
})

// Get site settings
app.get('/api/settings', async (c) => {
  const { DB } = c.env
  const settings = await DB.prepare('SELECT * FROM site_settings').all()
  
  return c.json({ success: true, data: settings.results })
})

// ==========================================
// CATEGORIES API
// ==========================================

app.get('/api/categories', async (c) => {
  const { DB } = c.env
  const categories = await DB.prepare(`
    SELECT * FROM categories 
    WHERE is_active = 1 
    ORDER BY display_order, name_en
  `).all()
  
  return c.json({ success: true, data: categories.results })
})

app.get('/api/categories/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  const category = await DB.prepare('SELECT * FROM categories WHERE id = ?').bind(id).first()
  
  if (!category) {
    return c.json({ success: false, error: 'Category not found' }, 404)
  }
  
  return c.json({ success: true, data: category })
})

// ==========================================
// PRODUCTS API
// ==========================================

app.get('/api/products', async (c) => {
  const { DB } = c.env
  const categoryId = c.req.query('category')
  const search = c.req.query('search')
  const limit = parseInt(c.req.query('limit') || '50')
  const offset = parseInt(c.req.query('offset') || '0')
  
  let query = 'SELECT p.*, c.name_en as category_name_en, c.name_ar as category_name_ar FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.is_active = 1'
  const params: any[] = []
  
  if (categoryId) {
    query += ' AND p.category_id = ?'
    params.push(categoryId)
  }
  
  if (search) {
    query += ' AND (p.name_en LIKE ? OR p.name_ar LIKE ? OR p.sku LIKE ?)'
    const searchTerm = `%${search}%`
    params.push(searchTerm, searchTerm, searchTerm)
  }
  
  query += ' ORDER BY p.is_featured DESC, p.created_at DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)
  
  const products = await DB.prepare(query).bind(...params).all()
  
  return c.json({ success: true, data: products.results, count: products.results.length })
})

app.get('/api/products/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  // Get product details
  const product = await DB.prepare(`
    SELECT p.*, c.name_en as category_name_en, c.name_ar as category_name_ar 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.id = ?
  `).bind(id).first()
  
  if (!product) {
    return c.json({ success: false, error: 'Product not found' }, 404)
  }
  
  // Get price tiers
  const priceTiers = await DB.prepare(`
    SELECT * FROM price_tiers 
    WHERE product_id = ? 
    ORDER BY min_quantity ASC
  `).bind(id).all()
  
  return c.json({ 
    success: true, 
    data: {
      ...product,
      price_tiers: priceTiers.results
    }
  })
})

// Calculate price for quantity
app.post('/api/products/:id/calculate-price', async (c) => {
  const { DB } = c.env
  const id = parseInt(c.req.param('id'))
  const { quantity } = await c.req.json()
  
  if (!quantity || quantity < 1) {
    return c.json({ success: false, error: 'Invalid quantity' }, 400)
  }
  
  const priceInfo = await calculatePrice(DB, id, quantity)
  
  if (!priceInfo) {
    return c.json({ success: false, error: 'Product not found' }, 404)
  }
  
  return c.json({ success: true, data: priceInfo })
})

// ==========================================
// AUTHENTICATION API
// ==========================================

app.post('/api/auth/register', async (c) => {
  const { DB } = c.env
  const data = await c.req.json()
  
  const { email, password, user_type, full_name, phone, company_name, commercial_registration, tax_id } = data
  
  // Validate required fields
  if (!email || !password || !user_type || !full_name || !phone) {
    return c.json({ success: false, error: 'Missing required fields' }, 400)
  }
  
  // Check if email exists
  const existing = await DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first()
  if (existing) {
    return c.json({ success: false, error: 'Email already registered' }, 400)
  }
  
  // Hash password
  const passwordHash = hashPassword(password)
  
  // Insert user
  const result = await DB.prepare(`
    INSERT INTO users (email, password_hash, user_type, status, full_name, phone, company_name, commercial_registration, tax_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    email,
    passwordHash,
    user_type,
    user_type === 'company' ? 'pending' : 'active', // Companies need approval
    full_name,
    phone,
    company_name || null,
    commercial_registration || null,
    tax_id || null
  ).run()
  
  return c.json({ 
    success: true, 
    message: user_type === 'company' ? 'Registration successful. Awaiting admin approval.' : 'Registration successful!',
    data: { user_id: result.meta.last_row_id }
  })
})

app.post('/api/auth/login', async (c) => {
  const { DB } = c.env
  const { email, password } = await c.req.json()
  
  if (!email || !password) {
    return c.json({ success: false, error: 'Email and password required' }, 400)
  }
  
  // Get user
  const user = await DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first() as any
  
  if (!user || !verifyPassword(password, user.password_hash)) {
    return c.json({ success: false, error: 'Invalid credentials' }, 401)
  }
  
  if (user.status !== 'active') {
    return c.json({ success: false, error: 'Account is not active. Please contact support.' }, 403)
  }
  
  // Update last login
  await DB.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').bind(user.id).run()
  
  // Return user data (excluding password)
  const { password_hash, ...userData } = user
  
  return c.json({ 
    success: true, 
    data: userData,
    message: 'Login successful'
  })
})

// ==========================================
// CART API
// ==========================================

app.get('/api/cart/:userId', async (c) => {
  const { DB } = c.env
  const userId = c.req.param('userId')
  
  const cartItems = await DB.prepare(`
    SELECT 
      ci.*,
      p.name_en, p.name_ar, p.sku, p.base_price, p.thumbnail, p.min_order_quantity, p.unit
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
  `).bind(userId).all()
  
  // Calculate prices for each item
  const itemsWithPrices = await Promise.all(
    cartItems.results.map(async (item: any) => {
      const priceInfo = await calculatePrice(DB, item.product_id, item.quantity)
      return { ...item, priceInfo }
    })
  )
  
  const total = itemsWithPrices.reduce((sum, item) => sum + (item.priceInfo?.subtotal || 0), 0)
  
  return c.json({ 
    success: true, 
    data: {
      items: itemsWithPrices,
      total,
      count: itemsWithPrices.length
    }
  })
})

app.post('/api/cart/:userId/add', async (c) => {
  const { DB } = c.env
  const userId = c.req.param('userId')
  const { product_id, quantity } = await c.req.json()
  
  if (!product_id || !quantity || quantity < 1) {
    return c.json({ success: false, error: 'Invalid data' }, 400)
  }
  
  // Check if product exists and get min order quantity
  const product = await DB.prepare('SELECT id, min_order_quantity FROM products WHERE id = ? AND is_active = 1').bind(product_id).first() as any
  
  if (!product) {
    return c.json({ success: false, error: 'Product not found' }, 404)
  }
  
  if (quantity < product.min_order_quantity) {
    return c.json({ success: false, error: `Minimum order quantity is ${product.min_order_quantity}` }, 400)
  }
  
  // Check if item already in cart
  const existing = await DB.prepare('SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?').bind(userId, product_id).first() as any
  
  if (existing) {
    // Update quantity
    await DB.prepare('UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(quantity, existing.id).run()
  } else {
    // Insert new item
    await DB.prepare('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)').bind(userId, product_id, quantity).run()
  }
  
  return c.json({ success: true, message: 'Item added to cart' })
})

app.delete('/api/cart/:userId/remove/:itemId', async (c) => {
  const { DB } = c.env
  const userId = c.req.param('userId')
  const itemId = c.req.param('itemId')
  
  await DB.prepare('DELETE FROM cart_items WHERE id = ? AND user_id = ?').bind(itemId, userId).run()
  
  return c.json({ success: true, message: 'Item removed from cart' })
})

app.delete('/api/cart/:userId/clear', async (c) => {
  const { DB } = c.env
  const userId = c.req.param('userId')
  
  await DB.prepare('DELETE FROM cart_items WHERE user_id = ?').bind(userId).run()
  
  return c.json({ success: true, message: 'Cart cleared' })
})

// ==========================================
// ORDERS API
// ==========================================

app.post('/api/orders', async (c) => {
  const { DB } = c.env
  const { user_id, delivery_address, delivery_city, delivery_notes } = await c.req.json()
  
  if (!user_id) {
    return c.json({ success: false, error: 'User ID required' }, 400)
  }
  
  // Get cart items
  const cartItems = await DB.prepare(`
    SELECT ci.*, p.name_en, p.name_ar, p.sku
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
  `).bind(user_id).all()
  
  if (cartItems.results.length === 0) {
    return c.json({ success: false, error: 'Cart is empty' }, 400)
  }
  
  // Calculate total and prepare order items
  let totalAmount = 0
  let totalDiscount = 0
  const orderItems = []
  
  for (const item of cartItems.results as any[]) {
    const priceInfo = await calculatePrice(DB, item.product_id, item.quantity)
    if (priceInfo) {
      totalAmount += priceInfo.subtotal
      const discountAmount = (priceInfo.unitPrice * priceInfo.quantity * priceInfo.discount) / 100
      totalDiscount += discountAmount
      
      orderItems.push({
        product_id: item.product_id,
        product_name_en: item.name_en,
        product_name_ar: item.name_ar,
        sku: item.sku,
        quantity: item.quantity,
        unit_price: priceInfo.unitPrice,
        discount_amount: discountAmount,
        subtotal: priceInfo.subtotal - discountAmount
      })
    }
  }
  
  const finalAmount = totalAmount - totalDiscount
  const orderNumber = generateOrderNumber()
  
  // Create order
  const orderResult = await DB.prepare(`
    INSERT INTO orders (order_number, user_id, status, total_amount, total_discount, final_amount, delivery_address, delivery_city, delivery_notes)
    VALUES (?, ?, 'pending', ?, ?, ?, ?, ?, ?)
  `).bind(user_id, orderNumber, totalAmount, totalDiscount, finalAmount, delivery_address, delivery_city, delivery_notes || null).run()
  
  const orderId = orderResult.meta.last_row_id
  
  // Insert order items
  for (const item of orderItems) {
    await DB.prepare(`
      INSERT INTO order_items (order_id, product_id, product_name_en, product_name_ar, sku, quantity, unit_price, discount_amount, subtotal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      orderId,
      item.product_id,
      item.product_name_en,
      item.product_name_ar,
      item.sku,
      item.quantity,
      item.unit_price,
      item.discount_amount,
      item.subtotal
    ).run()
  }
  
  // Clear cart
  await DB.prepare('DELETE FROM cart_items WHERE user_id = ?').bind(user_id).run()
  
  return c.json({ 
    success: true, 
    message: 'Order placed successfully',
    data: {
      order_id: orderId,
      order_number: orderNumber,
      total_amount: totalAmount,
      total_discount: totalDiscount,
      final_amount: finalAmount
    }
  })
})

app.get('/api/orders/:userId', async (c) => {
  const { DB } = c.env
  const userId = c.req.param('userId')
  
  const orders = await DB.prepare(`
    SELECT * FROM orders 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `).bind(userId).all()
  
  return c.json({ success: true, data: orders.results })
})

app.get('/api/orders/:userId/:orderId', async (c) => {
  const { DB } = c.env
  const userId = c.req.param('userId')
  const orderId = c.req.param('orderId')
  
  const order = await DB.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').bind(orderId, userId).first()
  
  if (!order) {
    return c.json({ success: false, error: 'Order not found' }, 404)
  }
  
  const items = await DB.prepare('SELECT * FROM order_items WHERE order_id = ?').bind(orderId).all()
  
  return c.json({ 
    success: true, 
    data: {
      ...order,
      items: items.results
    }
  })
})

// ==========================================
// ADMIN API ROUTES
// ==========================================

app.get('/api/admin/orders', async (c) => {
  const { DB } = c.env
  const status = c.req.query('status')
  
  let query = 'SELECT o.*, u.full_name, u.company_name, u.email FROM orders o JOIN users u ON o.user_id = u.id'
  const params: any[] = []
  
  if (status) {
    query += ' WHERE o.status = ?'
    params.push(status)
  }
  
  query += ' ORDER BY o.created_at DESC'
  
  const orders = await DB.prepare(query).bind(...params).all()
  
  return c.json({ success: true, data: orders.results })
})

app.patch('/api/admin/orders/:orderId/status', async (c) => {
  const { DB } = c.env
  const orderId = c.req.param('orderId')
  const { status } = await c.req.json()
  
  const validStatuses = ['pending', 'confirmed', 'processing', 'delivered', 'cancelled']
  if (!validStatuses.includes(status)) {
    return c.json({ success: false, error: 'Invalid status' }, 400)
  }
  
  await DB.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(status, orderId).run()
  
  return c.json({ success: true, message: 'Order status updated' })
})

app.get('/api/admin/users', async (c) => {
  const { DB } = c.env
  const userType = c.req.query('type')
  
  let query = 'SELECT id, email, user_type, status, full_name, phone, company_name, commercial_registration, tax_id, created_at FROM users WHERE user_type != \'admin\''
  const params: any[] = []
  
  if (userType) {
    query += ' AND user_type = ?'
    params.push(userType)
  }
  
  query += ' ORDER BY created_at DESC'
  
  const users = await DB.prepare(query).bind(...params).all()
  
  return c.json({ success: true, data: users.results })
})

app.patch('/api/admin/users/:userId/status', async (c) => {
  const { DB } = c.env
  const userId = c.req.param('userId')
  const { status } = await c.req.json()
  
  const validStatuses = ['pending', 'active', 'suspended']
  if (!validStatuses.includes(status)) {
    return c.json({ success: false, error: 'Invalid status' }, 400)
  }
  
  await DB.prepare('UPDATE users SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(status, userId).run()
  
  return c.json({ success: true, message: 'User status updated' })
})

app.get('/api/admin/analytics', async (c) => {
  const { DB } = c.env
  
  // Get total stats
  const totalOrders = await DB.prepare('SELECT COUNT(*) as count FROM orders').first() as any
  const totalRevenue = await DB.prepare('SELECT SUM(final_amount) as total FROM orders WHERE status != \'cancelled\'').first() as any
  const totalUsers = await DB.prepare('SELECT COUNT(*) as count FROM users WHERE user_type IN (\'company\', \'individual\')').first() as any
  const pendingOrders = await DB.prepare('SELECT COUNT(*) as count FROM orders WHERE status = \'pending\'').first() as any
  
  // Top products
  const topProducts = await DB.prepare(`
    SELECT 
      oi.product_name_en,
      oi.product_name_ar,
      SUM(oi.quantity) as total_quantity,
      SUM(oi.subtotal) as total_revenue
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.id
    WHERE o.status != 'cancelled'
    GROUP BY oi.product_id
    ORDER BY total_revenue DESC
    LIMIT 10
  `).all()
  
  return c.json({
    success: true,
    data: {
      total_orders: totalOrders?.count || 0,
      total_revenue: totalRevenue?.total || 0,
      total_users: totalUsers?.count || 0,
      pending_orders: pendingOrders?.count || 0,
      top_products: topProducts.results
    }
  })
})

// ==========================================
// FRONTEND ROUTES
// ==========================================

// Main homepage
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Twreedat | توريدات - B2B Wholesale Platform</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          [dir="rtl"] { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          [dir="ltr"] { font-family: Arial, Helvetica, sans-serif; }
        </style>
    </head>
    <body class="bg-gray-50">
        <div id="app"></div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
