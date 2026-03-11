import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Lock, CreditCard, Truck, MapPin, CheckCircle2 } from 'lucide-react'
import { createOrder } from '../api'
import { useCart } from '../store/useCart'
import { useAuth } from '../store/useAuth'

const Checkout = () => {
  const { items, getTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [address, setAddress] = useState({
    fullName: '',
    email: user?.email || '',
    street: '',
    city: '',
    zip: '',
    country: 'United States'
  })

  const total = getTotal()

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderRequest = {
        userId: user?.id,
        totalAmount: total,
        shippingAddress: JSON.stringify(address),
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      }

      await createOrder(orderRequest)

      setSuccess(true)
      clearCart()
      setTimeout(() => navigate('/dashboard'), 5000)
    } catch (err) {
      console.error(err)
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-display font-bold text-cookie-dark">Thank You For Your Order!</h1>
          <p className="text-cookie-dark/60 text-lg max-w-md mx-auto font-medium">Your cookies are being prepared with love and will be shipped shortly.</p>
          <div className="bg-primary-50 p-6 rounded-3xl max-w-sm mx-auto border border-cookie-light/10">
            <p className="text-xs text-cookie-dark/40 uppercase font-bold tracking-widest mb-2">Order Confirmation</p>
            <p className="text-cookie-dark font-bold">Check your inbox for the receipt</p>
          </div>
        </div>
        <button onClick={() => navigate('/dashboard')} className="btn-secondary group">
          View Order Status <Truck className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold text-cookie-dark mb-12">Checkout</h1>
      
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Shipping Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-cookie-light/10 space-y-10">
            <div className="flex items-center gap-4 text-cookie">
              <MapPin className="w-8 h-8" />
              <h2 className="text-2xl font-display font-bold text-cookie-dark">Shipping Address</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-cookie-dark/70 ml-1">Full Name</label>
                <input 
                  type="text" required
                  value={address.fullName}
                  onChange={(e) => setAddress({...address, fullName: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-primary-50 border border-cookie-light/10 focus:border-cookie focus:outline-none font-medium" 
                  placeholder="Enter recipient name" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-cookie-dark/70 ml-1">Street Address</label>
                <input 
                  type="text" required
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-primary-50 border border-cookie-light/10 focus:border-cookie focus:outline-none font-medium" 
                  placeholder="123 Cookie Lane" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-cookie-dark/70 ml-1">City</label>
                <input 
                  type="text" required
                  value={address.city}
                  onChange={(e) => setAddress({...address, city: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-primary-50 border border-cookie-light/10 focus:border-cookie focus:outline-none font-medium" 
                  placeholder="Baketown" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-cookie-dark/70 ml-1">ZIP Code</label>
                <input 
                  type="text" required
                  value={address.zip}
                  onChange={(e) => setAddress({...address, zip: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-primary-50 border border-cookie-light/10 focus:border-cookie focus:outline-none font-medium" 
                  placeholder="90210" 
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-cookie-light/10 space-y-10">
            <div className="flex items-center gap-4 text-cookie">
              <CreditCard className="w-8 h-8" />
              <h2 className="text-2xl font-display font-bold text-cookie-dark">Payment Details</h2>
            </div>
            
            <div className="p-6 border-2 border-cookie bg-primary-50 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-cookie w-6 h-6" />
                  <span className="font-bold text-cookie-dark uppercase tracking-widest text-sm">Card Payment</span>
                </div>
                <div className="flex gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="visa" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="mc" className="h-4" />
                </div>
              </div>
              <div className="bg-white border border-cookie-light/20 p-4 rounded-xl flex items-center justify-between">
                <span className="text-cookie-dark/60 font-medium">Securely processed by Stripe</span>
                <Lock className="w-4 h-4 text-green-600" />
              </div>
            </div>
            
            <p className="text-xs text-cookie-dark/40 text-center flex items-center justify-center gap-2">
               <ShieldCheck className="w-4 h-4" /> Your payment information is encrypted and never stored on our servers.
            </p>
          </div>
        </div>

        {/* Order Review */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-cookie-light/10 space-y-8 sticky top-32">
            <h2 className="text-2xl font-display font-bold text-cookie-dark">Order Summary</h2>
            
            <div className="max-h-60 overflow-y-auto space-y-4 pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-cookie-cream rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-cookie-dark text-sm truncate">{item.name}</p>
                    <p className="text-xs text-cookie-dark/60">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-cookie-dark text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <hr className="border-cookie-light/10" />

            <div className="space-y-4 text-cookie-dark/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-cookie-dark">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600 font-bold">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-cookie-dark pt-2">
                <span>Total</span>
                <span className="text-cookie">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-center disabled:opacity-50 flex items-center justify-center gap-2 shadow-cookie/30"
            >
              {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
