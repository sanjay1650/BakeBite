import { useState, useEffect } from 'react'
import { Plus, Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../store/useCart'
import { useAuth } from '../../store/useAuth'
import { addToWishlist, removeFromWishlist, isInWishlist } from '../../api/wishlist'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const CookieCard = ({ product }) => {
  const addItem = useCart((state) => state.addItem)
  const { user } = useAuth()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)

  useEffect(() => {
    if (user) {
      isInWishlist(user.id, product.id).then(setIsWishlisted)
    }
  }, [user, product.id])

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const handleToggleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
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

  return (
    <Link 
      to={`/product/${product.slug}`}
      className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-cookie-light/5 hover:border-cookie-light/20 block"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-cookie-cream flex items-center justify-center">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80'; // Fallback to a reliable cookie image
          }}
        />
        
        {/* badges */}
        {product.isFeatured && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-cookie text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
            Popular
          </span>
        )}
        
        <button 
          className={clsx(
            "absolute top-3 right-3 p-2 rounded-full transition-all shadow-sm z-20",
            isWishlisted ? "bg-red-500 text-white" : "bg-white/80 backdrop-blur-md text-cookie-dark hover:text-red-500"
          )}
          onClick={handleToggleWishlist}
          disabled={wishlistLoading}
        >
          <Heart className={clsx("w-4 h-4", isWishlisted && "fill-current")} />
        </button>

        <div className="absolute inset-0 bg-cookie-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl scale-90 group-hover:scale-100 transition-transform">
            <ShoppingBag className="w-6 h-6 text-cookie" />
          </div>
        </div>
      </div>

      <div className="px-2 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-display font-bold text-cookie-dark text-lg leading-tight group-hover:text-cookie transition-colors">
            {product.name}
          </h3>
          <span className="font-display font-bold text-cookie text-lg">
            ₹{product.price}
          </span>
        </div>
        
        <p className="text-xs text-cookie-dark/50 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-cookie-light/10 mt-4 group-hover:border-cookie/20 transition-colors">
          <div className="flex items-center gap-1">
            {product.dietaryTags?.map((tag, i) => (
              <span key={i} className="text-[10px] uppercase font-bold text-cookie-dark/40 border border-cookie-dark/10 px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-cookie text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-cookie/20 hover:bg-cookie-dark transition-all scale-95 hover:scale-100 active:scale-90"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </Link>
  )
}

export default CookieCard
