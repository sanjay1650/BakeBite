import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../store/useAuth'
import { useCart } from '../../store/useCart'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, profile, signOut } = useAuth()
  const items = useCart((state) => state.items)
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 glass shadow-sm border-b border-cookie-light/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-14 h-14 flex items-center justify-center overflow-hidden group-hover:rotate-12 transition-transform duration-500">
            <img 
              src="/logo.png" 
              alt="BakeBite" 
              className="w-full h-full object-contain mix-blend-multiply scale-110" 
            />
          </div>
          <span className="text-3xl font-display font-extrabold text-cookie-dark hidden md:block group-hover:text-cookie transition-colors tracking-tighter">
            BAKEBITE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-cookie-dark font-medium">
          <Link to="/" className="hover:text-cookie transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-cookie transition-colors">Shop</Link>
          <Link to="/shop?category=gourmet" className="hover:text-cookie transition-colors">Gourmet</Link>
          <Link to="/shop?category=custom" className="hover:text-cookie transition-colors">Custom</Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/cart" className="p-2 hover:bg-cookie/10 rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-cookie-dark" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-cookie-light/20">
              <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-cookie-light/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-cookie-dark" />
                </div>
                <span className="hidden lg:block text-sm font-semibold max-w-[100px] truncate">
                  {profile?.full_name || 'My Account'}
                </span>
              </Link>
              <button 
                onClick={signOut}
                className="p-2 hover:text-red-500 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary py-2 px-4 text-sm hidden md:block">
              Get Started
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-cookie-light/10 p-4 absolute w-full shadow-xl">
          <nav className="flex flex-col gap-4 text-cookie-dark font-medium">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link to="/shop?category=gourmet" onClick={() => setIsMenuOpen(false)}>Gourmet</Link>
            <Link to="/shop?category=custom" onClick={() => setIsMenuOpen(false)}>Custom</Link>
            <hr className="border-cookie-light/10" />
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="text-left text-red-500">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login / Sign Up</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
