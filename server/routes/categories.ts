import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

const categories = new Hono<{ Bindings: Bindings }>();

// Get all categories
categories.get('/', async (c) => {
  const { DB } = c.env;

  const result = await DB.prepare(
    `
    SELECT * FROM categories 
    WHERE is_active = 1 
    ORDER BY display_order, name_en
  `
  ).all();

  return c.json({ success: true, data: result.results });
});

// Get category by ID
categories.get('/:id', async (c) => {
  const { DB } = c.env;
  const id = c.req.param('id');

  const category = await DB.prepare('SELECT * FROM categories WHERE id = ?').bind(id).first();

  if (!category) {
    return c.json({ success: false, error: 'Category not found' }, 404);
  }

  return c.json({ success: true, data: category });
});

export default categories;
