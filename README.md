# 🍪 BakeBite - E-commerce

**"Irresistible Crumbs Delivered Fresh"**

Bakebite is a high-performance, premium e-commerce platform built for a gourmet cookie business. It features a modern tech stack centered around speed, scalability, and beautiful aesthetics.

## 🚀 Tech Stack

- **Frontend**: React 18, Tailwind CSS, Zustand, React Query, Axios.
- **Backend**: Java 17, Spring Boot 3.4, Spring Data JPA, Spring Security.
- **Infrastructure**: Supabase (PostgreSQL, Auth, Storage), Stripe (Payments).

## ✨ Features

- **Product Management**: Full catalog with categories (Classic, Gourmet, Custom) and dietary filters (Vegan, Gluten-Free).
- **User Experience**: Hero banner, featured products, responsive cart, and a smooth checkout flow.
- **Authentication**: Email/Password and Google OAuth via Supabase.
- **Admin Panel**: Statistics dashboard, product CRUD, and order management.
- **Payments**: Integrated Stripe flow logic.
- **SEO & Performance**: Optimized images, semantic HTML, and Outfit font for premium branding.

## 🛠️ Setup Instructions

### 1. Supabase Setup
1. Create a new project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** and run the contents of `supabase/schema.sql`.
3. Run the contents of `supabase/seed.sql` to populate your shop with 20+ cookies.
4. Set up **Storage**: Create a bucket named `cookie-images` and set it to public.
5. In **Authentication**, enable Google provider if desired.

### 2. Backend (Spring Boot)
1. Ensure You have **Java 17** installed.
2. Navigate to `/backend`.
3. Configure `src/main/resources/application.properties` with your Supabase DB credentials.
4. Run with: `./mvnw spring-boot:run`

### 3. Frontend (React)
1. Navigate to `/frontend`.
2. Create a `.env` file based on `.env.example`.
3. Install dependencies: `npm install`
4. Run development server: `npm run dev`

## 📦 Database Schema

- `products`: id, name, slug, price, stock, dietary_tags, category_id.
- `categories`: id, name, slug, description.
- `profiles`: id (FK to auth.users), role (admin/customer), full_name.
- `orders`: id, user_id, total_amount, status, shipping_address.
- `order_items`: id, order_id, product_id, quantity.

## 🎨 Design System

- **Primary Colors**: Browns (#8b5e34), Creams (#fefae0), and Espresso (#3e2a23).
- **Typography**: Outfit (Display), Inter (Body).
- **Glassmorphism**: Subtle blurs and borders used for navigation and cards to create a premium feel.

## 📈 SEO & Performance
- **Lazy Loading**: Images are optimized via background-size: cover.
- **Meta Tags**: Clean heading structure (H1 per page).
- **Modern Syntax**: React 18 concurrent features for smooth transitions.

---
*Created by Sanjay*
