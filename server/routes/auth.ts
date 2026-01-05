import { Hono } from 'hono';
import { verifyPassword } from '../utils/helpers';

type Bindings = {
  DB: D1Database;
};

const auth = new Hono<{ Bindings: Bindings }>();

// Login
auth.post('/login', async (c) => {
  const { DB } = c.env;
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ success: false, error: 'Email and password are required' }, 400);
  }

  const user = await DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();

  if (!user || !verifyPassword(password, user.password_hash as string)) {
    return c.json({ success: false, error: 'Invalid email or password' }, 401);
  }

  if (user.status === 'suspended') {
    return c.json({ success: false, error: 'Account suspended' }, 403);
  }

  if (user.status === 'pending') {
    return c.json({ success: false, error: 'Account pending approval' }, 403);
  }

  // Remove password hash from response
  const { password_hash, ...userData } = user;

  return c.json({ success: true, data: userData });
});

// Register
auth.post('/register', async (c) => {
  const { DB } = c.env;
  const data = await c.req.json();

  const {
    email,
    password,
    full_name,
    phone,
    user_type,
    company_name,
    commercial_registration,
    tax_id,
    address,
  } = data;

  if (!email || !password || !full_name || !phone || !user_type) {
    return c.json({ success: false, error: 'Missing required fields' }, 400);
  }

  // Check if user exists
  const existingUser = await DB.prepare('SELECT id FROM users WHERE email = ?')
    .bind(email)
    .first();

  if (existingUser) {
    return c.json({ success: false, error: 'Email already registered' }, 409);
  }

  // Hash password
  const password_hash = `$2a$10$${password}`;

  try {
    const result = await DB.prepare(
      `INSERT INTO users (
        email, password_hash, user_type, status, full_name, phone,
        company_name, commercial_registration, tax_id, address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        email,
        password_hash,
        user_type,
        'pending',
        full_name,
        phone,
        company_name || null,
        commercial_registration || null,
        tax_id || null,
        address || null
      )
      .run();

    return c.json({
      success: true,
      message: 'Registration successful. Your account is pending approval.',
      data: { id: result.meta.last_row_id },
    });
  } catch (error) {
    return c.json({ success: false, error: 'Registration failed' }, 500);
  }
});

export default auth;
