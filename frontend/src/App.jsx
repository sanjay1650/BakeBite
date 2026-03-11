import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuth } from './store/useAuth'

// Pages
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import UserDashboard from './pages/User/Dashboard'
import AdminDashboard from './pages/Admin/Dashboard'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,    // 5 minutes — don't refetch if data is fresh
      gcTime: 1000 * 60 * 10,       // 10 minutes — keep in memory cache
      refetchOnWindowFocus: false,   // Don't refetch when user switches tabs
      retry: 2,                      // Retry failed requests twice
    },
  },
})

function App() {
  const { user, profile, loading, refreshSession } = useAuth()

  useEffect(() => {
    refreshSession()
  }, [refreshSession])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="animate-bounce">
          <div className="w-16 h-16 bg-cookie rounded-full border-4 border-cookie-light flex items-center justify-center">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <p className="mt-4 text-cookie font-semibold">BAKEBITE is baking...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login?redirect=/checkout" />} />
              
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
              
              <Route path="/dashboard" element={user ? <UserDashboard /> : <Navigate to="/login" />} />
              
              {/* Admin Protected Route */}
              <Route path="/admin/*" element={
                user && profile?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </Router>
  )
}

export default App
