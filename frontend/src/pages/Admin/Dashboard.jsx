import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { LayoutDashboard, ShoppingBag, Users, DollarSign, TrendingUp, Package, ExternalLink, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { data: orders } = await supabase.from('orders').select('total_amount')
      const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
      const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
      
      const revenue = orders?.reduce((acc, o) => acc + (o.total_amount || 0), 0) || 0
      
      return { revenue, ordersCount: orders?.length || 0, productsCount, usersCount }
    }
  })

  const { data: recentOrders } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const { data } = await supabase
        .from('orders')
        .select('*, profiles (full_name)')
        .order('created_at', { ascending: false })
        .limit(5)
      return data
    }
  })

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-cookie-dark">Admin Control Center</h1>
          <p className="text-cookie-dark/60">Overview of your cookie empire performance.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/admin/products/new" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New Cookie
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <DollarSign />, label: 'Total Revenue', value: `$${stats?.revenue.toFixed(2)}`, trend: '+12.5%', color: 'bg-green-50 text-green-600' },
          { icon: <ShoppingBag />, label: 'Total Orders', value: stats?.ordersCount, trend: '+8.2%', color: 'bg-blue-50 text-blue-600' },
          { icon: <Package />, label: 'Products', value: stats?.productsCount, trend: 'Healthy', color: 'bg-orange-50 text-orange-600' },
          { icon: <Users />, label: 'Total Users', value: stats?.usersCount, trend: '+3.1%', color: 'bg-purple-50 text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-cookie-light/10 space-y-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-cookie-dark/40 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-display font-bold text-cookie-dark">{stat.value || '...'}</h3>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-green-500">
              <TrendingUp className="w-3 h-3" /> {stat.trend} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Recent Orders */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-cookie-light/10 overflow-hidden">
          <div className="p-8 border-b border-cookie-light/10 flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-cookie-dark">Recent Orders</h2>
            <Link to="/admin/orders" className="text-cookie font-bold text-sm hover:underline flex items-center gap-1">
              View All <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-cookie-light/5">
                    <th className="pb-4 text-xs font-bold text-cookie-dark/40 uppercase tracking-wider">Customer</th>
                    <th className="pb-4 text-xs font-bold text-cookie-dark/40 uppercase tracking-wider">Amount</th>
                    <th className="pb-4 text-xs font-bold text-cookie-dark/40 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cookie-light/5">
                  {recentOrders?.map(order => (
                    <tr key={order.id} className="group hover:bg-primary-50/50 transition-colors">
                      <td className="py-4 font-bold text-cookie-dark text-sm">{order.profiles?.full_name || 'Anonymous'}</td>
                      <td className="py-4 font-bold text-cookie text-sm">${order.total_amount}</td>
                      <td className="py-4">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-md">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div className="bg-cookie-dark rounded-[3rem] p-12 text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <LayoutDashboard className="w-12 h-12 text-cookie-light" />
          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold">Quick Actions</h2>
            <p className="text-white/60">Common maintenance tasks for your cookie shop.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Inventory Audit', desc: 'Scan low stock items' },
              { label: 'Flash Sale', desc: 'Create promo codes' },
              { label: 'Customer Export', desc: 'Download CSV list' },
              { label: 'Global Notice', desc: 'Alert banner update' },
            ].map((action, i) => (
              <button key={i} className="bg-white/10 hover:bg-white/20 p-6 rounded-3xl text-left transition-all group">
                <p className="font-bold text-sm mb-1">{action.label}</p>
                <p className="text-[10px] text-white/50 group-hover:text-white/80 transition-colors">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
