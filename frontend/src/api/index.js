/**
 * API Service — BakeBite
 *
 * Products & categories are fetched DIRECTLY from Supabase so they work
 * both locally and when deployed (no Spring Boot backend required for reads).
 *
 * Orders are still sent to the Spring Boot backend when available.
 */

import { supabase } from '../lib/supabase';
import axios from 'axios';

// Spring Boot backend (only needed for orders/write ops)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// ── Products (via Supabase — works on deploy too) ──────────────────────────

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      description,
      price,
      image_url,
      stock,
      dietary_tags,
      is_featured,
      created_at,
      category:categories(id, name, slug)
    `)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  // Normalize field names to camelCase to match the rest of the app
  return (data || []).map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    imageUrl: p.image_url,
    stock: p.stock,
    dietaryTags: p.dietary_tags || [],
    isFeatured: p.is_featured,
    createdAt: p.created_at,
    category: p.category,
  }));
};

export const getProductBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      description,
      price,
      image_url,
      stock,
      dietary_tags,
      is_featured,
      created_at,
      category:categories(id, name, slug)
    `)
    .eq('slug', slug)
    .single();

  if (error) throw new Error(error.message);

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    price: data.price,
    imageUrl: data.image_url,
    stock: data.stock,
    dietaryTags: data.dietary_tags || [],
    isFeatured: data.is_featured,
    createdAt: data.created_at,
    category: data.category,
  };
};

// ── Categories (via Supabase) ──────────────────────────────────────────────

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, description, icon_url')
    .order('name');

  if (error) throw new Error(error.message);
  return data || [];
};

// ── Orders (via Spring Boot backend) ──────────────────────────────────────

export const createOrder = async (orderData) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${session.access_token}`;
    }
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (err) {
    // Fallback: save order directly to Supabase if backend is unavailable
    console.warn('Backend unavailable, saving order to Supabase directly.');
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.userId,
        total_amount: orderData.totalAmount,
        shipping_address: orderData.shippingAddress,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    // Insert order items
    const items = orderData.items.map(item => ({
      order_id: data.id,
      product_id: item.productId,
      quantity: item.quantity,
      price_at_purchase: item.price,
    }));
    await supabase.from('order_items').insert(items);

    return data;
  }
};

export const getUserOrders = async (userId) => {
  // Fetch orders with their items directly from Supabase
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      total_amount,
      status,
      shipping_address,
      created_at,
      order_items(
        id,
        quantity,
        price_at_purchase,
        product:products(id, name, image_url, slug)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  // Normalize nested product field names
  return (data || []).map(order => ({
    ...order,
    order_items: order.order_items?.map(item => ({
      ...item,
      priceAtPurchase: item.price_at_purchase,
      product: item.product ? {
        ...item.product,
        imageUrl: item.product.image_url,
      } : null,
    })),
  }));
};

export default api;
