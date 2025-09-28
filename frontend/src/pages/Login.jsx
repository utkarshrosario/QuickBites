import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    try {
      const result = await dispatch(login(formData)).unwrap()
      if (result.success) navigate('/')
    } catch (error) {
      setErrors({ submit: error.message || 'Login failed' })
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-amber-300 rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">🍕</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your QuickBites account</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email"/>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your password"/>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox"
                  className="h-4 w-4 text-primary border-gray-300 rounded"/>
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-amber-50 to-amber-100 text-black py-3 px-4 rounded-lg font-bold cursor-pointer">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">Don't have an account?{' '}
              <Link to="/register" className="text-primary text-black font-semibold">Sign up here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login