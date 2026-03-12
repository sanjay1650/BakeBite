import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-cookie-cream pt-20 pb-10 border-t border-cookie-light/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 flex items-center justify-center overflow-hidden group-hover:rotate-12 transition-transform duration-500">
                <img 
                  src="/logo.png" 
                  alt="BakeBite" 
                  className="w-full h-full object-contain mix-blend-multiply scale-110" 
                />
              </div>
              <span className="text-2xl font-display font-extrabold text-cookie-dark group-hover:text-cookie transition-colors tracking-tighter">
                BAKEBITE
              </span>
            </Link>
            <p className="text-cookie-dark/60 font-medium leading-relaxed">
              Irresistible crumbs delivered fresh. Handcrafted gourmet cookies made with premium ingredients and a sprinkle of love.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-cookie-dark hover:bg-cookie hover:text-white transition-all shadow-sm">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-bold text-cookie-dark mb-6">Explore</h3>
            <ul className="space-y-4 text-cookie-dark/60 font-medium">
              <li><Link to="/shop" className="hover:text-cookie transition-colors">Shop All</Link></li>
              <li><Link to="/shop?category=gourmet" className="hover:text-cookie transition-colors">Gourmet Selection</Link></li>
              <li><Link to="/shop?category=custom" className="hover:text-cookie transition-colors">Custom Cookies</Link></li>
              <li><Link to="/shop?category=vegan" className="hover:text-cookie transition-colors">Vegan Options</Link></li>
              <li><Link to="/shop?category=gluten-free" className="hover:text-cookie transition-colors">Gluten-Free</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-display font-bold text-cookie-dark mb-6">Support</h3>
            <ul className="space-y-4 text-cookie-dark/60 font-medium">
              <li><a href="#" className="hover:text-cookie transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-cookie transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-cookie transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-cookie transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cookie transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-display font-bold text-cookie-dark mb-6">Connect</h3>
            <ul className="space-y-4 text-cookie-dark/60 font-medium">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cookie" />
                <span>bakebite@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cookie" />
                <span>+91 9347654729</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-cookie" />
                <span>Hyderabad</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-cookie-light/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-cookie-dark/40 font-medium">
            © 2026 BAKEBITE. All crumbs reserved.
          </p>
          <p className="text-sm text-cookie-dark/40 font-medium flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for cookie lovers.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
