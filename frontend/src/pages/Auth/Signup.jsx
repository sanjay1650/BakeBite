import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, Lock, User, UserPlus, ArrowLeft } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const Signup = () => {
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      setTimeout(() => navigate(`/login${redirect !== '/' ? `?redirect=${redirect}` : ''}`), 3000)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-primary-100">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <UserPlus className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-display font-bold text-cookie-dark">Account Created!</h1>
          <p className="text-cookie-dark/60 font-medium">We've sent a verification email to <strong>{email}</strong>. Please confirm your email to start craving!</p>
          <p className="text-xs text-cookie-dark/40 italic">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-primary-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-cookie/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cookie-light/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-12 relative z-10 border border-cookie-light/10">
        <Link to="/" className="inline-flex items-center gap-2 text-cookie-dark/60 hover:text-cookie transition-colors text-sm font-bold mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl font-display font-bold text-cookie-dark">Create Account</h1>
          <p className="text-cookie-dark/60">Join the sweetest club in town!</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-cookie-dark/80 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cookie-dark/40" />
              <input 
                type="text" 
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary-50 border border-cookie-light/10 focus:outline-none focus:border-cookie transition-colors font-medium"
              />
            </div>
          </div>

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
            <label className="text-sm font-bold text-cookie-dark/80 ml-1">Password</label>
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
            {loading ? 'Creating account...' : <><UserPlus className="w-5 h-5" /> Sign Up</>}
          </button>
        </form>

        <p className="text-center mt-10 text-sm font-bold text-cookie-dark/60">
          Already have an account? <Link to={`/login${redirect !== '/' ? `?redirect=${redirect}` : ''}`} className="text-cookie hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
