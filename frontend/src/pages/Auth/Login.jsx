import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../store/useAuth'

const Login = () => {
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const refreshSession = useAuth((state) => state.refreshSession)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      await refreshSession()
      navigate(redirect)
    }
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-primary-100 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cookie/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cookie-light/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-12 relative z-10 border border-cookie-light/10">
        <Link to="/" className="inline-flex items-center gap-2 text-cookie-dark/60 hover:text-cookie transition-colors text-sm font-bold mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl font-display font-bold text-cookie-dark">Welcome Back!</h1>
          <p className="text-cookie-dark/60">Ready for some more delicious crumbs?</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-cookie-dark/80 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cookie-dark/40" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary-50 border border-cookie-light/10 focus:outline-none focus:border-cookie transition-colors font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-cookie-dark/80">Password</label>
              <Link to="/reset-password" name="reset-password" id="reset-password"  className="text-xs font-bold text-cookie hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cookie-dark/40" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary-50 border border-cookie-light/10 focus:outline-none focus:border-cookie transition-colors font-medium"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 p-3 rounded-xl">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg shadow-cookie/20 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : <><LogIn className="w-5 h-5" /> Sign In</>}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-cookie-light/10"></div></div>
          <div className="relative flex justify-center text-xs font-bold uppercase"><span className="bg-white px-4 text-cookie-dark/40">Or continue with</span></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full py-4 rounded-2xl border-2 border-cookie-light/10 flex items-center justify-center gap-3 font-bold text-cookie-dark hover:bg-primary-50 transition-all active:scale-95"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Google
        </button>

        <p className="text-center mt-10 text-sm font-bold text-cookie-dark/60">
          Don't have an account? <Link to={`/signup${redirect !== '/' ? `?redirect=${redirect}` : ''}`} className="text-cookie hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
