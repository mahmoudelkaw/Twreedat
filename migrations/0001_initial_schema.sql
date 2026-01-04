-- Users Table (supports both B2B companies and individuals)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK(user_type IN ('company', 'individual', 'admin', 'operations')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'active', 'suspended')),
  
  -- Personal Info
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Company Info (for B2B)
  company_name TEXT,
  commercial_registration TEXT,
  tax_id TEXT,
  
  -- Metadata
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);

-- Categories Table (bilingual support)
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  parent_id INTEGER,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);

-- Products Table (bilingual support)
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sku TEXT UNIQUE NOT NULL,
  category_id INTEGER NOT NULL,
  
  -- Bilingual Content
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  specifications_en TEXT,
  specifications_ar TEXT,
  
  -- Pricing & Inventory
  base_price REAL NOT NULL,
  min_order_quantity INTEGER NOT NULL DEFAULT 1,
  stock_quantity INTEGER DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'carton',
  
  -- Product Details
  brand TEXT,
  weight TEXT,
  dimensions TEXT,
  
  -- Images (JSON array of URLs)
  images TEXT DEFAULT '[]',
  thumbnail TEXT,
  
  -- Status
  is_active INTEGER DEFAULT 1,
  is_featured INTEGER DEFAULT 0,
  
  -- Metadata
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Price Tiers Table (Quantity-based pricing - CRITICAL FEATURE)
CREATE TABLE IF NOT EXISTS price_tiers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  min_quantity INTEGER NOT NULL,
  max_quantity INTEGER,
  price_per_unit REAL NOT NULL,
  discount_percentage REAL DEFAULT 0,
  tier_name_en TEXT,
  tier_name_ar TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE(product_id, min_quantity)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT UNIQUE NOT NULL,
  user_id INTEGER NOT NULL,
  
  -- Order Details
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'processing', 'delivered', 'cancelled')),
  total_amount REAL NOT NULL,
  total_discount REAL DEFAULT 0,
  final_amount REAL NOT NULL,
  
  -- Delivery Info
  delivery_address TEXT,
  delivery_city TEXT,
  delivery_notes TEXT,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  confirmed_at DATETIME,
  delivered_at DATETIME,
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  
  -- Product snapshot at time of order
  product_name_en TEXT NOT NULL,
  product_name_ar TEXT NOT NULL,
  sku TEXT NOT NULL,
  
  -- Pricing details
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  discount_amount REAL DEFAULT 0,
  subtotal REAL NOT NULL,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Shopping Cart Table
CREATE TABLE IF NOT EXISTS cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE(user_id, product_id)
);

-- Site Settings Table (for dynamic content management)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value_en TEXT,
  value_ar TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_type_status ON users(user_type, status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_price_tiers_product ON price_tiers(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_cart_user ON cart_items(user_id);

-- Insert default admin user (password: admin123 - CHANGE THIS!)
INSERT INTO users (email, password_hash, user_type, status, full_name, phone) 
VALUES ('admin@twreedat.com', '$2a$10$rqZxYxJKZxYxJKZxYxJKZO', 'admin', 'active', 'Admin User', '+20100000000');

-- Insert default site settings
INSERT INTO site_settings (key, value_en, value_ar) VALUES
('site_name', 'Twreedat', 'توريدات'),
('site_tagline', 'B2B Wholesale Platform', 'منصة الجملة للشركات'),
('terms_conditions', 'Terms and Conditions content here', 'الشروط والأحكام هنا'),
('privacy_policy', 'Privacy Policy content here', 'سياسة الخصوصية هنا'),
('about_us', 'About Twreedat platform', 'عن منصة توريدات'),
('contact_email', 'info@twreedat.com', 'info@twreedat.com'),
('contact_phone', '+20 100 000 0000', '+20 100 000 0000');
