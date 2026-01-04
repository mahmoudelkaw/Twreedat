-- Sample Categories
INSERT INTO categories (name_en, name_ar, slug, description_en, description_ar, display_order) VALUES
('Copy Paper', 'ورق طباعة', 'copy-paper', 'High-quality copy paper for offices', 'ورق طباعة عالي الجودة للمكاتب', 1),
('Tissues', 'مناديل', 'tissues', 'Various types of tissue products', 'أنواع مختلفة من المناديل', 2),
('Cleaning Supplies', 'مستلزمات تنظيف', 'cleaning-supplies', 'Professional cleaning products', 'منتجات تنظيف احترافية', 3);

-- Sample Products - Copy Paper
INSERT INTO products (sku, category_id, name_en, name_ar, description_en, description_ar, specifications_en, specifications_ar, base_price, min_order_quantity, stock_quantity, brand, unit) VALUES
('DP-A4-80', 1, 'Double A A4 Paper - 80 GSM', 'ورق دوبل ايه A4 - 80 جرام', 'Premium quality copy paper, suitable for all printing needs', 'ورق طباعة عالي الجودة، مناسب لجميع احتياجات الطباعة', 'Size: A4 (210x297mm), Weight: 80 GSM, Sheets per ream: 500, Reams per carton: 5', 'المقاس: A4 (210×297مم)، الوزن: 80 جرام، عدد الأوراق: 500 ورقة، عدد الحزم بالكرتونة: 5', 600, 10, 500, 'Double A', 'carton'),
('DP-A3-80', 1, 'Double A A3 Paper - 80 GSM', 'ورق دوبل ايه A3 - 80 جرام', 'Large format premium copy paper', 'ورق طباعة بمقاس كبير عالي الجودة', 'Size: A3 (297x420mm), Weight: 80 GSM, Sheets per ream: 500, Reams per carton: 3', 'المقاس: A3 (297×420مم)، الوزن: 80 جرام، عدد الأوراق: 500 ورقة، عدد الحزم بالكرتونة: 3', 950, 10, 300, 'Double A', 'carton'),
('PP-A4-75', 1, 'PaperOne A4 - 75 GSM', 'ورق بيبر وان A4 - 75 جرام', 'Economic copy paper for daily use', 'ورق طباعة اقتصادي للاستخدام اليومي', 'Size: A4 (210x297mm), Weight: 75 GSM, Sheets per ream: 500, Reams per carton: 5', 'المقاس: A4 (210×297مم)، الوزن: 75 جرام، عدد الأوراق: 500 ورقة، عدد الحزم بالكرتونة: 5', 480, 10, 800, 'PaperOne', 'carton');

-- Sample Products - Tissues
INSERT INTO products (sku, category_id, name_en, name_ar, description_en, description_ar, specifications_en, specifications_ar, base_price, min_order_quantity, stock_quantity, brand, unit) VALUES
('TF-200-2P', 2, 'Fine Facial Tissues - 200 Sheets (2 Ply)', 'مناديل فاين للوجه - 200 منديل (طبقتين)', 'Soft and absorbent facial tissues', 'مناديل وجه ناعمة وعالية الامتصاص', 'Sheets per box: 200, Ply: 2, Boxes per carton: 24', 'عدد المناديل: 200، عدد الطبقات: 2، عدد العلب بالكرتونة: 24', 180, 5, 600, 'Fine', 'carton'),
('TT-300-3P', 2, 'Premium Toilet Tissue - 300 Sheets (3 Ply)', 'مناديل تواليت فاخرة - 300 ورقة (3 طبقات)', 'Ultra-soft 3-ply toilet tissue', 'مناديل تواليت فائقة النعومة 3 طبقات', 'Sheets per roll: 300, Ply: 3, Rolls per carton: 48', 'عدد الأوراق: 300، عدد الطبقات: 3، عدد اللفات بالكرتونة: 48', 320, 5, 400, 'Fino', 'carton');

-- Sample Products - Cleaning Supplies
INSERT INTO products (sku, category_id, name_en, name_ar, description_en, description_ar, specifications_en, specifications_ar, base_price, min_order_quantity, stock_quantity, brand, unit) VALUES
('CS-FL-5L', 3, 'Floor Cleaner - 5 Liters', 'منظف أرضيات - 5 لتر', 'Professional grade floor cleaning solution', 'منظف أرضيات احترافي', 'Volume: 5L, Type: Concentrate, Bottles per carton: 4', 'الحجم: 5 لتر، النوع: مركز، عدد الزجاجات بالكرتونة: 4', 240, 6, 350, 'CleanPro', 'carton'),
('CS-DS-750ML', 3, 'Dish Soap - 750ml', 'صابون أطباق - 750 مل', 'Heavy-duty dish washing liquid', 'سائل غسيل أطباق قوي', 'Volume: 750ml, Type: Concentrate, Bottles per carton: 12', 'الحجم: 750 مل، النوع: مركز، عدد الزجاجات بالكرتونة: 12', 180, 8, 500, 'Fairy', 'carton');

-- Price Tiers for Double A A4 Paper (Alibaba-style tiered pricing)
INSERT INTO price_tiers (product_id, min_quantity, max_quantity, price_per_unit, discount_percentage, tier_name_en, tier_name_ar) VALUES
(1, 10, 30, 600, 0, '10-30 cartons', '10-30 كرتونة'),
(1, 31, 100, 590, 1.67, '31-100 cartons', '31-100 كرتونة'),
(1, 101, 500, 580, 3.33, '101-500 cartons', '101-500 كرتونة'),
(1, 501, NULL, 570, 5, '500+ cartons', '500+ كرتونة');

-- Price Tiers for Double A A3 Paper
INSERT INTO price_tiers (product_id, min_quantity, max_quantity, price_per_unit, discount_percentage, tier_name_en, tier_name_ar) VALUES
(2, 10, 30, 950, 0, '10-30 cartons', '10-30 كرتونة'),
(2, 31, 100, 940, 1.05, '31-100 cartons', '31-100 كرتونة'),
(2, 101, 500, 930, 2.11, '101-500 cartons', '101-500 كرتونة'),
(2, 501, NULL, 920, 3.16, '500+ cartons', '500+ كرتونة');

-- Price Tiers for PaperOne A4
INSERT INTO price_tiers (product_id, min_quantity, max_quantity, price_per_unit, discount_percentage, tier_name_en, tier_name_ar) VALUES
(3, 10, 50, 480, 0, '10-50 cartons', '10-50 كرتونة'),
(3, 51, 150, 470, 2.08, '51-150 cartons', '51-150 كرتونة'),
(3, 151, NULL, 460, 4.17, '150+ cartons', '150+ كرتونة');

-- Price Tiers for Facial Tissues
INSERT INTO price_tiers (product_id, min_quantity, max_quantity, price_per_unit, discount_percentage, tier_name_en, tier_name_ar) VALUES
(4, 5, 20, 180, 0, '5-20 cartons', '5-20 كرتونة'),
(4, 21, 100, 175, 2.78, '21-100 cartons', '21-100 كرتونة'),
(4, 101, NULL, 170, 5.56, '100+ cartons', '100+ كرتونة');

-- Price Tiers for Toilet Tissue
INSERT INTO price_tiers (product_id, min_quantity, max_quantity, price_per_unit, discount_percentage, tier_name_en, tier_name_ar) VALUES
(5, 5, 20, 320, 0, '5-20 cartons', '5-20 كرتونة'),
(5, 21, 100, 310, 3.13, '21-100 cartons', '21-100 كرتونة'),
(5, 101, NULL, 300, 6.25, '100+ cartons', '100+ كرتونة');

-- Price Tiers for Floor Cleaner
INSERT INTO price_tiers (product_id, min_quantity, max_quantity, price_per_unit, discount_percentage, tier_name_en, tier_name_ar) VALUES
(6, 6, 30, 240, 0, '6-30 cartons', '6-30 كرتونة'),
(6, 31, 100, 230, 4.17, '31-100 cartons', '31-100 كرتونة'),
(6, 101, NULL, 220, 8.33, '100+ cartons', '100+ كرتونة');

-- Price Tiers for Dish Soap
INSERT INTO price_tiers (product_id, min_quantity, max_quantity, price_per_unit, discount_percentage, tier_name_en, tier_name_ar) VALUES
(7, 8, 30, 180, 0, '8-30 cartons', '8-30 كرتونة'),
(7, 31, 100, 175, 2.78, '31-100 cartons', '31-100 كرتونة'),
(7, 101, NULL, 170, 5.56, '100+ cartons', '100+ كرتونة');

-- Sample Company User (for testing B2B features)
INSERT INTO users (email, password_hash, user_type, status, full_name, phone, company_name, commercial_registration, tax_id) 
VALUES ('company@test.com', '$2a$10$rqZxYxJKZxYxJKZxYxJKZO', 'company', 'active', 'Ahmed Hassan', '+201001234567', 'Cairo Trading Co.', 'CR-123456789', 'TAX-987654321');

-- Sample Individual User
INSERT INTO users (email, password_hash, user_type, status, full_name, phone) 
VALUES ('individual@test.com', '$2a$10$rqZxYxJKZxYxJKZxYxJKZO', 'individual', 'active', 'Mohamed Ali', '+201009876543');
