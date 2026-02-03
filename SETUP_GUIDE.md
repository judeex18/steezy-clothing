# Quick Setup Guide - Steezy Clothing Admin

## Step 1: Create Your Admin Account

1. **Open your Supabase Dashboard**: https://supabase.com/dashboard
2. Click on your project: **Steezy Clothing**
3. Go to **Authentication** (left sidebar)
4. Click **Users** tab
5. Click **Add User** button (top right)
6. Select **Create new user**
7. Fill in:
   - **Email**: your-email@example.com (e.g., admin@steezy.com)
   - **Password**: Choose a strong password
8. Click **Create user**

## Step 2: Login to Admin Panel

1. Go to: **https://steezy-clothing-online.vercel.app/admin/login**
2. Enter the email and password you just created
3. Click **Sign In**
4. You'll be redirected to the product management page

## Step 3: Add Your First Product

1. Click **+ Add Product** button
2. Fill in the product details:
   - **Name**: e.g., "Urban Street Tee"
   - **Price**: e.g., 1599 (in pesos, no decimal)
   - **Description**: Product description
   - **Category**: e.g., "T-Shirts"
   - **Sizes**: S, M, L, XL (comma-separated)
   - **Stock**: e.g., 50
   - **Upload Image**: Click to upload product photo
3. Click **Save Product**
4. ✅ Product will appear on your website immediately!

## Step 4: Set Up Product Images Storage

If image upload doesn't work, you need to create a storage bucket:

1. In Supabase Dashboard, go to **Storage** (left sidebar)
2. Click **Create new bucket**
3. Name: **products**
4. Make it **Public**
5. Click **Create bucket**

## That's It! 🎉

Your admin panel is now ready to use!

### Admin URLs:
- **Login**: https://steezy-clothing-online.vercel.app/admin/login
- **Products**: https://steezy-clothing-online.vercel.app/admin/products
- **Orders**: https://steezy-clothing-online.vercel.app/admin/orders

### What Happens Next:
1. You add products via admin panel
2. They appear instantly on homepage
3. Customers can buy them
4. Orders show up in admin/orders
5. You manage everything from the admin panel

### Need Help?
- Products not showing? Check Supabase database has products
- Can't login? Make sure you created a user in Supabase Auth
- Images not uploading? Create "products" storage bucket in Supabase
