# Twreedat Admin Panel Guide
## Complete Administration System

---

## 🎯 Overview

The Twreedat admin panel is a comprehensive administration system with 6 main sections accessible through a professional sidebar navigation.

**Access**: Login as admin → Click "Admin Panel" in navigation

---

## 📊 1. Overview Dashboard

**Route**: `/admin` or `/admin-overview`

### Features:
- **Analytics Cards**:
  - Total Orders
  - Total Revenue (in EGP)
  - Total Users (excluding admins)
  - Pending Orders

- **Top Products Table**:
  - Product name (bilingual)
  - Number of orders
  - Total revenue generated
  - Sortedby revenue (top 5 displayed)

- **Quick Actions**:
  - View All Transactions
  - Manage Users
  - Manage Products

### Use Cases:
- Get a quick overview of platform performance
- Identify best-selling products
- Monitor pending orders that need attention
- Track total revenue and user growth

---

## 👥 2. Users Management

**Route**: `/admin-users`

### Features:

#### Users Table
- **Columns**: ID, Email, Phone, Type, Status, Actions
- **Filters**:
  - Search by email/name
  - Filter by type (Company/Individual)
- **Row Actions**:
  - View full profile

#### User Profile Detail View
Clicking "View" on any user opens a detailed modal showing:

**User Information**:
- User ID
- Email
- Phone
- User Type (company/individual)
- Status (active/pending/suspended)
- Company Name (if company)
- Commercial Registration Number
- Tax ID

**Order History**:
- Complete list of all user orders
- Order numbers, dates, totals, and status
- Click any order to view full details

**Actions Available**:
- **Approve**: Activate pending company registrations
- **Suspend**: Temporarily disable user accounts
- **Activate**: Re-enable suspended accounts

### Use Cases:
- Approve new company registrations
- View customer purchase history
- Suspend fraudulent or problematic accounts
- Verify company registration details
- Track customer activity

---

## 🧾 3. Transactions (Orders)

**Route**: `/admin-transactions`

### Features:

#### Orders Table
- **Columns**: Order ID, Customer, Type, Amount, Status, Actions
- **Filters**:
  - Filter by status (All/Pending/Confirmed/Processing/Delivered/Cancelled)
- **Row Actions**:
  - View full order details

#### Transaction Detail View
Clicking "View" opens a comprehensive order modal with:

**Customer Information**:
- Full name
- Email
- Phone number

**Delivery Information**:
- Delivery address
- City
- Special notes

**Order Items Table**:
- Product names
- Unit prices
- Quantities
- Line totals

**Pricing Breakdown**:
- Subtotal
- VAT (14% for Egypt)
- Final Total

**Order Status Management**:
- Update status with one click:
  - Pending
  - Confirmed
  - Processing
  - Delivered
  - Cancelled

**Actions**:
- **Print Packing Slip**: Generate printable shipping document
- **Update Status**: Change order status

### Use Cases:
- Process new orders (Pending → Confirmed)
- Update shipping status (Confirmed → Processing → Delivered)
- Review order details before shipping
- Print packing slips for warehouse
- Cancel problematic orders
- Track order fulfillment
- Calculate VAT for accounting

---

## 📦 4. Products Management

**Route**: `/admin-products`

### Features:

#### Products Table
- **Columns**: ID, Product Name (EN/AR), Category, SKU, Base Price, Actions
- **Actions**: Edit, Delete (Phase 2)

#### Categories Section
- Visual grid of all categories
- Category names in English and Arabic
- Slug display
- Edit/Delete controls (Phase 2)

#### Buttons:
- **Add Product**: Create new products (Phase 2)
- **Add Category**: Create new categories (Phase 2)

### Use Cases:
- View all products at a glance
- Monitor product inventory
- Manage product categories
- Add new products to catalog (Phase 2)
- Update product information (Phase 2)

### Note:
Full CRUD (Create, Read, Update, Delete) functionality for products and categories will be implemented in Phase 2. Currently, products can be managed through the database.

---

## 🛡️ 5. Admin Users Management

**Route**: `/admin-admins`

### Features:

#### Admin Users Table
- **Columns**: ID, Name, Email, Phone, Status, Created Date, Actions
- **Actions**: Edit, Delete
- **Security**: Cannot delete your own admin account

#### Actions:
- **Add Admin**: Create new admin accounts (Phase 2)
- **Edit**: Modify admin details (Phase 2)
- **Delete**: Remove admin access (Phase 2)

### Security Notes:
⚠️ **Important**: 
- Admin users have full platform access
- Only grant admin privileges to trusted personnel
- Use strong passwords for all admin accounts
- Current demo password: `admin123` (CHANGE IN PRODUCTION!)

### Use Cases:
- Add new administrators
- Manage admin team members
- Remove admin access when employees leave
- Monitor admin account creation dates

---

## 📄 6. Terms & Conditions Editor

**Route**: `/admin-terms`

### Features:

#### Dual Language Editor
- **English Version**: Left panel
- **Arabic Version**: Right panel (RTL)
- Textarea editors with HTML support

#### Preview Section
- Real-time preview of terms
- Language toggle button
- Shows how terms will appear to users

#### Save Functionality
- Save button to update terms
- Validates both versions are filled
- Updates database (Phase 2)

### Tips:
- ✅ Use HTML tags for formatting (`<p>`, `<ul>`, `<strong>`, etc.)
- ✅ Preview changes before saving
- ✅ Fill both English and Arabic versions
- ✅ Keep terms clear and concise

### Use Cases:
- Update platform terms and conditions
- Add new policies
- Modify legal disclaimers
- Maintain bilingual compliance documents

---

## 🎨 Design Features

### Sidebar Navigation
- **Fixed left sidebar** with gradient background
- **Active page highlighting** (white background)
- **Icon-based navigation** for clarity
- **Back to Site** button at bottom

### Color Scheme
- Blue (#2563eb) for primary actions
- Purple (#764ba2) for gradients
- Green for success states
- Red for warnings/cancellations
- Yellow for pending states

### UI Components
- **Modal dialogs** for detail views
- **Tables with hover effects**
- **Status badges** with color coding
- **Action buttons** with icons
- **Loading states** and transitions

---

## 📊 Statistics & Analytics

### Overview Dashboard Metrics:
- **Total Orders**: All time order count
- **Total Revenue**: Sum of all non-cancelled orders
- **Total Users**: Company + Individual accounts
- **Pending Orders**: Orders awaiting confirmation

### Top Products Analysis:
- Order count per product
- Revenue per product
- Top 5 best sellers
- Sorted by total revenue

---

## 🔒 Access Control

### Admin Authentication:
- Only users with `user_type = 'admin'` can access
- All admin pages check authentication
- Automatic redirect to login if not authenticated

### Current Admin Account:
- **Email**: admin@twreedat.com
- **Password**: admin123
- **Status**: Active

⚠️ **Change password before production deployment!**

---

## 🚀 Quick Actions Guide

### To Approve a Company Registration:
1. Go to **Users Management**
2. Find the pending company user
3. Click **View**
4. Review company details
5. Click **Approve**
6. User receives active status

### To Process an Order:
1. Go to **Transactions**
2. Filter by status: **Pending**
3. Click **View** on the order
4. Review order details
5. Click **Confirmed**
6. Update to **Processing** when ready
7. Update to **Delivered** when shipped

### To View Customer History:
1. Go to **Users Management**
2. Click **View** on any user
3. Scroll down to **Order History**
4. Click any order to view details

### To Update Terms:
1. Go to **Terms & Conditions**
2. Edit English version (left)
3. Edit Arabic version (right)
4. Toggle preview to check
5. Click **Save Changes**

---

## 📱 Mobile Responsiveness

All admin pages are fully responsive and work on:
- Desktop (optimized for large screens)
- Tablets (sidebar may collapse)
- Mobile devices (touch-friendly)

---

## 🔮 Phase 2 Enhancements (Planned)

### Products Management:
- Full CRUD forms for products
- Image upload functionality
- Bulk price tier editor
- Product inventory tracking

### User Management:
- Direct admin user creation
- Password reset functionality
- User notes/comments
- Activity logs

### Orders:
- PDF invoice generation
- Email notifications
- Bulk status updates
- Order export to Excel/CSV

### Terms:
- API endpoint for saving terms
- Version history
- Change tracking

---

## 💡 Best Practices

1. **Review orders daily** - Check pending orders in Overview
2. **Approve companies quickly** - Don't leave registrations pending
3. **Update order status** - Keep customers informed
4. **Monitor top products** - Restock best sellers
5. **Keep terms updated** - Review legal documents regularly
6. **Secure admin accounts** - Use strong passwords
7. **Regular backups** - Export data periodically

---

## 🆘 Troubleshooting

### Admin panel not loading?
- Check you're logged in as admin
- Clear browser cache
- Check console for JavaScript errors

### Can't see user details?
- Ensure API endpoints are working
- Check database connection
- Verify user ID exists

### Status updates not saving?
- Check network connection
- Verify API is responding
- Check browser console for errors

---

## 📞 Support

For technical issues or questions:
- Check README.md for general information
- Review database schema in migrations/
- Contact platform administrator

---

**Last Updated**: January 4, 2026
**Platform**: Twreedat B2B Wholesale E-Commerce
**Version**: MVP Phase 1 Complete

---

© 2026 Twreedat - Professional B2B E-Commerce Platform
