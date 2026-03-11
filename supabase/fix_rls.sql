-- ============================================================
-- BAKEBITE: Fix Infinite Recursion in RLS Policy + Enable Products
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/odamimtcvbrlxgrybqyw/sql
-- ============================================================

-- Step 1: Drop the problematic recursive policies on profiles
DROP POLICY IF EXISTS "Admin can view all profiles" ON profiles;

-- Step 2: Recreate it using a SECURITY DEFINER function (no recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Step 3: Re-add the admin profile policy using the safe function
CREATE POLICY "Admin can view all profiles" ON profiles
  FOR SELECT USING (public.is_admin());

-- Step 4: Also fix admin policies on other tables that may have the same issue
DROP POLICY IF EXISTS "Allow admin to manage categories" ON categories;
CREATE POLICY "Allow admin to manage categories" ON categories
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Allow admin to manage products" ON products;
CREATE POLICY "Allow admin to manage products" ON products
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin can manage all orders" ON orders;
CREATE POLICY "Admin can manage all orders" ON orders
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin can manage all order items" ON order_items;
CREATE POLICY "Admin can manage all order items" ON order_items
  FOR ALL USING (public.is_admin());

-- Step 5: Ensure products & categories allow INSERT for order_items by users
DROP POLICY IF EXISTS "Users can insert their own order items" ON order_items;
CREATE POLICY "Users can insert their own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
  );

-- Verify: this should return your products
SELECT id, name, price FROM products LIMIT 5;
