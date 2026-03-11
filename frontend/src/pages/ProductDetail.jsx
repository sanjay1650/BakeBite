import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Plus, Minus, Heart, Share2, ShieldCheck, Clock, Truck, Star, ArrowLeft, ShoppingBag } from 'lucide-react'
import { getProductBySlug, getProducts } from '../api'
import { useCart } from '../store/useCart'
import { useAuth } from '../store/useAuth'
import { addToWishlist, removeFromWishlist, isInWishlist } from '../api/wishlist'
import { clsx } from 'clsx'

const ProductDetail = () => {
  const { slug } = useParams()
  const [quantity, setQuantity] = useState(1)
  const addItem = useCart((state) => state.addItem)
  const { user } = useAuth()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug)
  })

  useEffect(() => {
    if (user && product) {
      isInWishlist(user.id, product.id).then(setIsWishlisted)
    }
  }, [user, product])

  const handleToggleWishlist = async () => {
    if (!user) {
      alert('Please login to wishlist products')
      return
    }

    setWishlistLoading(true)
    try {
      if (isWishlisted) {
        await removeFromWishlist(user.id, product.id)
        setIsWishlisted(false)
      } else {
        await addToWishlist(user.id, product.id)
        setIsWishlisted(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setWishlistLoading(false)
    }
  }

  const { data: relatedProducts } = useQuery({
    queryKey: ['related-products', product?.category?.id],
    enabled: !!product,
    queryFn: async () => {
      const products = await getProducts();
      return products
        .filter(p => p.category?.id === product.category?.id && p.id !== product.id)
        .slice(0, 4);
    }
  })

  if (isLoading) return <div className="min-h-screen animate-pulse" />
  if (!product) return <div>Product not found</div>

  return (
    <div className="container mx-auto px-4 py-12 space-y-20">
      <Link to="/shop" className="inline-flex items-center gap-2 text-cookie-dark/60 hover:text-cookie transition-colors font-bold">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-cookie-light/10">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-white rounded-2xl overflow-hidden border border-cookie-light/10 cursor-pointer hover:border-cookie transition-colors">
                <img src={product.imageUrl} alt="thumbnail" className="w-full h-full object-cover opacity-50 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-cookie-light/20 text-cookie-dark text-xs font-bold uppercase tracking-widest rounded-full">
                {product.category?.name}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-500" />
                <span className="text-cookie-dark font-bold text-sm">4.9 (128 Reviews)</span>
              </div>
            </div>
            
            <h1 className="text-5xl font-display font-extrabold text-cookie-dark">{product.name}</h1>
            <p className="text-3xl font-display font-bold text-cookie">₹{product.price}</p>
          </div>

          <p className="text-lg text-cookie-dark/70 leading-relaxed font-medium">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {product.dietaryTags?.map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-primary-100 text-cookie-dark/60 rounded-full font-bold text-xs uppercase">
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-6 pt-6 border-t border-cookie-light/10">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-6 bg-primary-100 p-2 rounded-2xl">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-white rounded-xl transition-colors text-cookie-dark shadow-sm"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-bold text-xl w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-white rounded-xl transition-colors text-cookie-dark shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <button 
                onClick={() => addItem(product, quantity)}
                className="btn-primary flex-grow py-4 text-lg flex items-center justify-center gap-3 group"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
                Add To Bag — ₹{(product.price * quantity).toFixed(2)}
              </button>

              <button 
                onClick={handleToggleWishlist}
                disabled={wishlistLoading}
                className={clsx(
                  "p-4 border rounded-2xl transition-all shadow-sm",
                  isWishlisted ? "bg-red-500 text-white border-red-500" : "bg-white border-cookie-light/10 text-cookie-dark hover:text-red-500"
                )}
              >
                <Heart className={clsx("w-6 h-6", isWishlisted && "fill-current")} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs font-bold text-green-800">Quality Guarantee</p>
                  <p className="text-[10px] text-green-700">100% Satisfaction or refund</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl">
                <Truck className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs font-bold text-blue-800">Fresh Shipping</p>
                  <p className="text-[10px] text-blue-700">Baked & shipped same day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
