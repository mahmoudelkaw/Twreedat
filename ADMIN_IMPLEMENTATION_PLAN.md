# Twreedat Admin Panel - Complete Implementation Plan

## 🎯 Structure Overview

```
Admin Panel (with Sidebar)
├── 1. Overview (Dashboard)
├── 2. Users Management
│   ├── Users Table (ID, Email, Phone, Type, Status)
│   └── User Profile Page (click user)
│       ├── User Info
│       └── User Orders History
├── 3. Transactions (Orders)
│   ├── Orders Table (Order ID, Customer, Type, Amount, Status)
│   └── Order Detail Page (click order)
│       ├── Order Info
│       ├── Products List
│       ├── Prices & VAT
│       └── Packing Slip (Print/PDF)
├── 4. Products Management
│   ├── Products Table
│   ├── Add Product Form
│   ├── Edit Product
│   ├── Categories Table
│   └── Add Category
├── 5. Admin Users
│   ├── Admin Users Table
│   └── Add Admin Form
└── 6. Terms & Conditions
    └── Content Editor

```

## 📋 Detailed Features

### 1. Sidebar Navigation
- Fixed left sidebar (or right for RTL)
- Menu items with icons
- Active page highlighted
- User info at top

### 2. Users Page
**Table Columns:**
- User ID
- Email  
- Phone Number
- Type (Company/Individual)
- Status (Active/Pending/Suspended)
- Actions (View Profile button)

**User Profile Page:**
- Full user information
- Company details (if B2B)
- All user's orders table
- Back button

### 3. Transactions Page
**Table Columns:**
- Order ID
- Customer Name
- Type (Company/Individual)
- Amount
- Status (Placed/Pending Payment/Paid/Delivered)
- Actions (View Details button)

**Order Detail Page:**
- Order information
- Customer details
- Products table with quantities & prices
- Subtotal
- VAT (15%)
- Total Amount
- Packing Slip section
- Print button
- Download PDF button
- Back button

### 4. Products Page
**Products Table:**
- Product ID
- SKU
- Name (AR/EN)
- Category
- Base Price
- Stock
- Min Quantity
- Actions (Edit/Delete)

**Add Product Button → Form:**
- SKU
- Name EN/AR
- Description EN/AR
- Category dropdown
- Base Price
- Min Order Quantity
- Stock
- Save/Cancel buttons

**Categories Section:**
- Categories table
- Add Category button → Form

### 5. Admin Users Page
**Table:**
- Admin ID
- Name
- Email
- Phone
- Created Date
- Actions (Edit/Delete)

**Add Admin Button:**
- Form to create new admin

### 6. Terms & Conditions Page
- Textarea for EN content
- Textarea for AR content
- Save button

## 🔧 Technical Implementation

### Routes to Add:
- admin-overview
- admin-users
- admin-user-profile/:id
- admin-transactions
- admin-transaction-detail/:id
- admin-products
- admin-admins
- admin-terms

### State Management:
- Selected User ID
- Selected Order ID
- Form data

This is approximately 2000+ lines of code.
Estimated time: 2-3 hours to implement completely.

