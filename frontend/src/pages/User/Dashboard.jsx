import { useQuery } from '@tanstack/react-query'
import { Package, MapPin, Settings, Heart, LogOut, ChevronRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../store/useAuth'
import { getUserOrders } from '../../api'

const Dashboard = () => {
  const { user, profile, signOut } = useAuth()

  const { data: orders, isLoading } = useQuery({
    queryKey: ['my-orders', user?.id],
    queryFn: () => getUserOrders(user.id)
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-cookie-light/10 text-center space-y-4">
            <div className="w-24 h-24 bg-cookie-light/20 rounded-full flex items-center justify-center mx-auto text-cookie font-bold text-3xl">
              {profile?.full_name?.charAt(0) || user?.email?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-cookie-dark">{profile?.full_name || 'Cookie Craver'}</h2>
              <p className="text-sm text-cookie-dark/50">{user?.email}</p>
            </div>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full">
              Member since 2024
            </span>
          </div>

          <nav className="bg-white p-4 rounded-[2rem] shadow-sm border border-cookie-light/10 overflow-hidden">
            {[
              { icon: <Package />, label: 'Orders', active: true },
              { icon: <Heart />, label: 'Wishlist', active: false },
              { icon: <MapPin />, label: 'Addresses', active: false },
              { icon: <Settings />, label: 'Profile Settings', active: false },
            ].map((item, i) => (
              <button key={i} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${item.active ? 'bg-cookie text-white shadow-lg shadow-cookie/20' : 'text-cookie-dark/60 hover:bg-primary-50'}`}>
                <span className="w-5 h-5">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <button 
              onClick={signOut}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm mt-4"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-display font-bold text-cookie-dark">My Orders</h1>
            <p className="text-cookie-dark/60">Keep track of all your sweet deliveries.</p>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2].map(i => <div key={i} className="h-40 bg-white rounded-3xl animate-pulse" />)}
            </div>
          ) : orders?.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-[2.5rem] shadow-sm border border-cookie-light/10 overflow-hidden">
                  <div className="p-6 lg:p-10 flex flex-col md:flex-row justify-between gap-6 bg-primary-50/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-grow">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-cookie-dark/40 tracking-wider mb-1">Order Date</p>
                        <p className="font-bold text-cookie-dark text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-cookie-dark/40 tracking-wider mb-1">Total</p>
                        <p className="font-bold text-cookie-dark text-sm">₹{order.total_amount}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-cookie-dark/40 tracking-wider mb-1">Status</p>
                        <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-md">
                          {order.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-cookie-dark/40 tracking-wider mb-1">Order ID</p>
                        <p className="font-bold text-cookie-dark text-[10px] truncate max-w-[100px]">{order.id}</p>
                      </div>
                    </div>
                    <button className="btn-secondary py-2 px-4 text-xs whitespace-nowrap">View Receipt</button>
                  </div>

                  <div className="p-6 lg:p-10 space-y-6">
                    {order.order_items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6 group">
                        <div className="w-16 h-16 bg-cookie-cream rounded-2xl overflow-hidden shadow-sm">
                          <img src={item.product?.imageUrl} alt={item.product?.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-cookie-dark group-hover:text-cookie transition-colors">{item.product?.name}</h4>
                          <p className="text-xs text-cookie-dark/40">Quantity: {item.quantity} × ₹{item.priceAtPurchase}</p>
                        </div>
                        <button className="p-2 rounded-xl border border-cookie-light/20 hover:bg-cookie hover:text-white transition-all">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-cookie-light/20 space-y-6">
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-10 h-10 text-cookie-light" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-cookie-dark">No orders yet</h3>
                <p className="text-cookie-dark/50">Your order history will appear here once you make a purchase.</p>
              </div>
              <Link to="/shop" className="btn-primary inline-block">Start Shopping</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
