import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

const products = new Hono<{ Bindings: Bindings }>();

// Get all products
products.get('/', async (c) => {
  const { DB } = c.env;
  const limit = c.req.query('limit');
  const categoryId = c.req.query('category');

  let query = `
    SELECT 
      p.*,
      c.name_ar as category_name_ar,
      c.name_en as category_name_en
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.is_active = 1
  `;

  const params: any[] = [];

  if (categoryId) {
    query += ' AND p.category_id = ?';
    params.push(categoryId);
  }

  query += ' ORDER BY p.name_en';

  if (limit) {
    query += ' LIMIT ?';
    params.push(parseInt(limit));
  }

  const result = await DB.prepare(query).bind(...params).all();

  // Parse images JSON
  const products = result.results.map((p: any) => ({
    ...p,
    images: p.images ? JSON.parse(p.images) : [],
  }));

  return c.json({ success: true, data: products });
});

// Get product by ID
products.get('/:id', async (c) => {
  const { DB } = c.env;
  const id = c.req.param('id');

  const product = await DB.prepare(
    `
    SELECT 
      p.*,
      c.name_ar as category_name_ar,
      c.name_en as category_name_en
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `
  )
    .bind(id)
    .first();

  if (!product) {
    return c.json({ success: false, error: 'Product not found' }, 404);
  }

  // Get price tiers
  const tiers = await DB.prepare(
    `SELECT * FROM price_tiers WHERE product_id = ? ORDER BY min_quantity`
  )
    .bind(id)
    .all();

  return c.json({
    success: true,
    data: {
      ...product,
      images: product.images ? JSON.parse(product.images as string) : [],
      price_tiers: tiers.results,
    },
  });
});

export default products;
