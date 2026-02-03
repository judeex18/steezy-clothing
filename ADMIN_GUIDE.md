# Admin Panel Guide

## Overview

Your Steezy Clothing e-commerce website is now fully dynamic. Products are stored in Supabase and automatically appear on the website.

## How It Works

### 1. Admin Panel

- Access: `/admin/products`
- Login required with Supabase Auth

### 2. Adding New Products

1. Go to `/admin/products`
2. Click "Add New Product"
3. Fill in product details:
   - Name
   - Price (in pesos)
   - Description
   - Category
   - Sizes (comma-separated: S, M, L, XL)
   - Stock quantity
   - Upload product image
4. Click "Save Product"
5. **Product appears instantly on homepage** - No redeployment needed!

### 3. Managing Products

- **Edit**: Click edit button on any product
- **Delete**: Click delete button to remove product
- **Stock**: Update stock levels anytime

### 4. Customer Flow

1. Customer browses products on homepage (auto-fetched from database)
2. Clicks product to view details on `/products/[id]`
3. Selects size and adds to cart (modal confirmation)
4. Goes to checkout
5. Fills shipping info
6. Selects payment method:
   - **Cash on Delivery (COD)** - Pay when order arrives
   - **GCash** - Digital wallet payment
   - **Cash on Pickup (COP)** - Pay when picking up at store
7. Order is saved to database with "pending" status

### 5. Order Management

- Access: `/admin/orders`
- View all orders
- Update order status
- See customer details and items

## Database Structure

### Products Table

- `id`: Auto-generated
- `name`: Product name
- `price`: Price in pesos
- `description`: Product description
- `category`: Product category
- `sizes`: Array of available sizes
- `stock`: Available quantity
- `image_url`: Product image URL

### Orders Table

- `id`: Auto-generated
- `customer_name`: Customer name
- `address`: Shipping address
- `total_amount`: Order total
- `payment_method`: cod, gcash, or cop
- `status`: pending, processing, shipped, delivered

## Important Notes

✅ **Dynamic**: Products added via admin panel appear immediately on website
✅ **No Redeployment**: Changes to products don't require code deployment
✅ **Database-Driven**: All product data comes from Supabase
✅ **Automatic Fallback**: If database is empty, shows mock products temporarily

## Setup Required

1. **Supabase Project**:
   - Create tables: products, orders, order_items
   - Enable Row Level Security (RLS)
   - Set up Storage bucket for product images

2. **Environment Variables** (Already configured in Vercel):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Admin Authentication**:
   - Set up Supabase Auth
   - Create admin user account

## Next Steps

1. Log in to Supabase dashboard
2. Create your first product via admin panel
3. Test the complete customer flow
4. Monitor orders via admin panel

Your website is now production-ready! 🚀
