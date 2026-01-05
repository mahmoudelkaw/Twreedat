// Simple password hashing (in production, use proper bcrypt)
export function hashPassword(password: string): string {
  return `$2a$10$${password}`; // Simplified for MVP
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Generate order number
export function generateOrderNumber(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
}

// Calculate price based on quantity and tiers
export async function calculatePrice(db: D1Database, productId: number, quantity: number) {
  const product = await db
    .prepare('SELECT * FROM products WHERE id = ?')
    .bind(productId)
    .first();

  if (!product) {
    return null;
  }

  // Get applicable price tier
  const tier = await db
    .prepare(
      `
    SELECT * FROM price_tiers 
    WHERE product_id = ? 
    AND min_quantity <= ? 
    AND (max_quantity IS NULL OR max_quantity >= ?)
    ORDER BY min_quantity DESC 
    LIMIT 1
  `
    )
    .bind(productId, quantity, quantity)
    .first();

  const unitPrice = tier ? Number(tier.price_per_unit) : Number(product.base_price);
  const discount = tier ? Number(tier.discount_percentage) : 0;

  return {
    productId,
    quantity,
    unitPrice,
    discount,
    subtotal: unitPrice * quantity,
    tierName: tier ? { en: tier.tier_name_en, ar: tier.tier_name_ar } : null,
  };
}
