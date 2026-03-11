import { supabase } from '../lib/supabase'

export const getWishlist = async (userId) => {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*, products(*)')
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}

export const addToWishlist = async (userId, productId) => {
  const { data, error } = await supabase
    .from('wishlist')
    .insert([{ user_id: userId, product_id: productId }])
    .select()
  
  if (error) throw error
  return data
}

export const removeFromWishlist = async (userId, productId) => {
  const { data, error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)
  
  if (error) throw error
  return data
}

export const isInWishlist = async (userId, productId) => {
  const { data, error } = await supabase
    .from('wishlist')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return !!data
}
