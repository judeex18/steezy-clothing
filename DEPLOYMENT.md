# Deployment Guide

## Prerequisites

- Supabase account
- GitHub account
- Vercel account

## Step 1: Set up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Once created, go to **Settings** > **API**
3. Copy your:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon/public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### Database Schema

Run these SQL queries in the Supabase SQL Editor:

```sql
-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  shipping_address TEXT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  size VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to products
CREATE POLICY "Allow public read access to products"
ON products FOR SELECT
TO public
USING (true);

-- Create policy for inserting orders
CREATE POLICY "Allow public insert to orders"
ON orders FOR INSERT
TO public
WITH CHECK (true);

-- Create policy for inserting order items
CREATE POLICY "Allow public insert to order_items"
ON order_items FOR INSERT
TO public
WITH CHECK (true);

-- Insert sample products
INSERT INTO products (name, description, price, image, category, stock) VALUES
('Classic Black Hoodie', 'Premium cotton blend hoodie with embroidered logo', 79.99, '/products/hoodie-black.jpg', 'Hoodies', 50),
('White Graphic Tee', 'Oversized fit with exclusive street art design', 39.99, '/products/tee-white.jpg', 'T-Shirts', 100),
('Cargo Joggers', 'Comfortable utility joggers with multiple pockets', 89.99, '/products/joggers-cargo.jpg', 'Pants', 75),
('Denim Jacket', 'Vintage wash denim with distressed details', 129.99, '/products/jacket-denim.jpg', 'Jackets', 30),
('Track Pants', 'Retro-inspired track pants with side stripes', 69.99, '/products/pants-track.jpg', 'Pants', 60),
('Bomber Jacket', 'Classic bomber in premium nylon', 149.99, '/products/jacket-bomber.jpg', 'Jackets', 40);
```

## Step 2: Configure Environment Variables Locally

1. Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

2. Replace the values with your actual Supabase credentials

## Step 3: Push to GitHub

1. Create a new repository on GitHub (don't initialize with README)
2. Run these commands:

```bash
git add .
git commit -m "Initial commit - Steezy Clothing Store"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 4: Deploy to Vercel

### Option A: Via Vercel Dashboard

1. Go to [https://vercel.com](https://vercel.com)
2. Click **Add New** > **Project**
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**

### Option B: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts and add your environment variables when asked.

## Step 5: Verify Deployment

1. Visit your deployed site
2. Test the following:
   - Home page loads
   - Navigation works (smooth scroll)
   - Products display from Supabase
   - Product details page works
   - Cart functionality
   - Checkout process

## Updating Your Site

After pushing changes to GitHub:

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically redeploy your site.

## Troubleshooting

### Products not loading

- Check Supabase credentials in Vercel environment variables
- Verify database tables exist and have data
- Check RLS policies are configured correctly

### Build errors

- Run `npm run build` locally first
- Check for any ESLint or TypeScript errors
- Review Vercel build logs

### Environment variables not working

- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new environment variables
- Clear cache: Settings > General > Clear cache and redeploy
