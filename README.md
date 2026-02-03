# Steezy Clothing Store 🛍️

A modern, single-page e-commerce clothing store built with Next.js, featuring smooth scroll navigation, product listings, cart functionality, and admin management.

## ✨ Features

### Customer Features

- **Single-Page Scroll Layout**: Smooth scrolling navigation with active link highlighting
- **Hero Section**: Eye-catching landing with brand showcase
- **Featured Products**: Carousel slideshow of highlighted items
- **Product Grid**: Browse complete product catalog with filtering
- **About Section**: Brand story and company information
- **Contact Section**: Integrated contact form with business details
- **Shopping Cart**: Add, remove, and update items (managed with Zustand)
- **Checkout**: Multi-step checkout with multiple payment options
  - Cash on Delivery (COD)
  - GCash payment with reference number
  - Credit/Debit Card payment
- **Order Confirmation**: Success page with order tracking

### Admin Features

- **Admin Dashboard**: Protected admin panel
- **Product Management**: Full CRUD operations with image upload
- **Order Management**: View and update order status
- **Order Tracking**: Monitor pending, processing, shipped, delivered, and cancelled orders

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.6 (App Router + Turbopack)
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand
- **Deployment**: Vercel
- **Version Control**: Git + GitHub

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account ([sign up](https://supabase.com))
- GitHub account
- Vercel account (optional, for deployment)

## 🛠️ Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Supabase

See detailed instructions in [DEPLOYMENT.md](DEPLOYMENT.md)

Quick start:
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from DEPLOYMENT.md in your SQL Editor
3. Copy your project URL and anon key

### 3. Configure Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
steezy-clothing/
├── app/
│   ├── components/         # Reusable UI components
│   │   ├── Header.js      # Navigation with active scroll links
│   │   ├── Footer.js      # Site footer
│   │   └── ProductCard.js # Product display card
│   ├── lib/
│   │   └── supabase.js    # Supabase client & API functions
│   ├── store/
│   │   └── cartStore.js   # Zustand cart state management
│   ├── data/
│   │   └── products.js    # Fallback mock data
│   ├── admin/             # Admin dashboard pages
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── page.js            # Single-page home (Hero, Products, About, Contact)
│   ├── layout.js          # Root layout
│   └── globals.css        # Global styles + smooth scroll
├── public/                # Static assets
├── .env.local.example     # Environment variables template
├── DEPLOYMENT.md          # Deployment guide
└── README.md
```

## 🌐 Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Manual Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step instructions including:
- Supabase database setup
- GitHub repository creation
- Vercel deployment
- Environment configuration

## 🛒 Features Walkthrough

### Single-Page Experience
Navigate seamlessly between sections with smooth scroll:
- **Home** (#home) - Hero section with brand intro
- **Products** (#products) - Full product catalog
- **About** (#about) - Brand story and values
- **Contact** (#contact) - Get in touch form

### Shopping Flow
1. Browse products on the home page or products section
2. Click a product to view details
3. Select size and add to cart
4. Review cart and proceed to checkout
5. Fill in shipping details
6. Choose payment method (COD, GCash, Card)
7. Place order and receive confirmation

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Customization

### Adding Products via Admin Panel
1. Navigate to `/admin`
2. Enter admin credentials (set up in Supabase Auth)
3. Go to Products Management
4. Click "Add New Product"
5. Upload images and fill in details

### Modifying Styles
- Edit `app/globals.css` for global styles
- Tailwind classes are used throughout components
- Smooth scroll behavior: `.nav-link.active` in globals.css

## 📝 License

This project is for educational and portfolio purposes.

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

## 📧 Contact

For questions or feedback about this project, use the contact form on the live site.

---

Built with ❤️ using Next.js and Tailwind CSS

```bash
npm run build
```

## Deploy on Vercel

1. Push your code to GitHub.
2. Connect your repository to [Vercel](https://vercel.com).
3. Add your environment variables in Vercel's dashboard.
4. Deploy!

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.
