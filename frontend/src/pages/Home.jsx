import { ArrowRight, Star, Truck, Award, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api'
import CookieCard from '../components/shop/CookieCard'

const Home = () => {
  const { data: featuredProducts, isLoading, error } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const products = await getProducts();
      const featured = products.filter(p => p.isFeatured);
      // Fall back to all products if none are marked as featured
      return (featured.length > 0 ? featured : products).slice(0, 4);
    }
  })

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-primary-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cookie/10 skew-x-12 translate-x-20 hidden lg:block" />
        
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 bg-cookie-light/20 text-cookie-dark font-bold text-sm tracking-widest rounded-full uppercase">
              Freshly Baked Daily
            </span>
            <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-cookie-dark leading-tight">
              Irresistible Crumbs <br />
              <span className="text-cookie">Delivered Fresh</span>
            </h1>
            <p className="text-lg text-cookie-dark/70 max-w-lg mx-auto lg:mx-0">
              Handcrafted gourmet cookies made with premium ingredients and a sprinkle of love. From classic chocolate chip to adventurous custom flavors.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/shop" className="btn-primary flex items-center gap-2 group">
                Shop Our Cookies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/shop?category=custom" className="btn-secondary">
                Custom Orders
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-4 justify-center lg:justify-start">

              <p className="text-sm font-medium text-cookie-dark/60">
                <span className="text-cookie-dark font-bold">Coming Soon....</span> 
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="animate-float relative z-10 w-full max-w-md mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80" 
                alt="Featured Cookie" 
                className="rounded-3xl shadow-2xl border-8 border-white transform rotate-3"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-cookie-cream rounded-full -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cookie/20 rounded-full -z-10" />
            
            <div className="absolute top-1/2 -right-10 bg-white p-4 rounded-2xl shadow-xl glass z-20 space-y-1 hidden md:block">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <p className="text-sm font-bold text-cookie-dark">Best Seller</p>
              <p className="text-xs text-cookie-dark/60">Triple Choc Chunk</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <Truck />, title: 'Fresh Delivery', desc: 'Doorstep cookies in 24h' },
            { icon: <Award />, title: 'Premium Quality', desc: 'Organic ingredients only' },
            { icon: <ShieldCheck />, title: 'Pure & Safe', desc: 'No preservatives added' },
            { icon: <Star />, title: 'Top Rated', desc: '4.9/5 Customer reviews' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-cookie-light/5 hover:border-cookie-light/20 transition-all">
              <div className="w-12 h-12 bg-cookie-light/10 rounded-xl flex items-center justify-center text-cookie font-bold">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-cookie-dark">{item.title}</h3>
                <p className="text-xs text-cookie-dark/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-bold text-cookie-dark">Fan Favorites</h2>
            <p className="text-cookie-dark/60">The cookies that keep our cravers coming back for more.</p>
          </div>
          <Link to="/shop" className="text-cookie font-bold flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-[400px] bg-white rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-red-500 font-bold text-lg">Failed to load products</p>
            <p className="text-cookie-dark/60 text-sm font-mono bg-red-50 p-4 rounded-xl max-w-2xl mx-auto">{error.message}</p>
            <p className="text-cookie-dark/50 text-sm">Check your Supabase credentials in the <code>.env</code> file.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts?.map((cookie) => (
              <CookieCard key={cookie.id} product={cookie} />
            ))}
          </div>
        )}
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-cookie-dark rounded-[3rem] p-12 lg:p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cookie.png')]" />
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-white relative z-10">
            Join the Cookie Club & <br />
            <span className="text-cookie-light">Get 15% Off</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto relative z-10">
            Sign up for our newsletter and get sweet deals delivered to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center relative z-10">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-8 py-4 rounded-full bg-white/10 text-white w-full max-w-md border border-white/20 focus:outline-none focus:border-white/50"
            />
            <button className="bg-white text-cookie-dark px-10 py-4 rounded-full font-bold hover:bg-cookie-cream transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
