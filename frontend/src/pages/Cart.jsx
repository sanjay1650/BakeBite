import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../store/useCart'

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotal } = useCart()
  const total = getTotal()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-8">
        <div className="w-24 h-24 bg-cookie-cream rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-12 h-12 text-cookie-light" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-display font-bold text-cookie-dark">Your cart is empty</h1>
          <p className="text-cookie-dark/60 max-w-sm mx-auto">Looks like you haven't added any crumbs to your cart yet. Let's fix that!</p>
        </div>
        <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold text-cookie-dark mb-12">Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-cookie-light/10">
              <div className="w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-cookie-cream">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow space-y-2 text-center sm:text-left">
                <h3 className="text-xl font-display font-bold text-cookie-dark">{item.name}</h3>
                <p className="text-sm text-cookie-dark/60 line-clamp-1">{item.description}</p>
                <p className="text-cookie font-bold">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-4 bg-primary-100 p-2 rounded-2xl">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-white rounded-xl transition-colors text-cookie-dark"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold w-8 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-white rounded-xl transition-colors text-cookie-dark"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-right flex flex-col items-end gap-2">
                <p className="text-lg font-bold text-cookie-dark">₹{(item.price * item.quantity).toFixed(2)}</p>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-cookie-light/10 space-y-8 sticky top-32">
          <h2 className="text-2xl font-display font-bold text-cookie-dark">Order Summary</h2>
          
          <div className="space-y-4 text-cookie-dark/70">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-cookie-dark">₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-bold uppercase text-xs tracking-wider">Free</span>
            </div>
            <hr className="border-cookie-light/10" />
            <div className="flex justify-between text-xl font-bold text-cookie-dark">
              <span>Total</span>
              <span className="text-cookie">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <Link to="/checkout" className="btn-primary w-full py-4 text-center block text-lg">
            Proceed to Checkout
          </Link>

          <p className="text-xs text-center text-cookie-dark/40 italic">
            Tax calculated at checkout. Secure checkout via Stripe.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cart
