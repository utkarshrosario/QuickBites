import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../features/auth/authSlice'

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: ''
  })
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
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    try {
      const result = await dispatch(register(formData)).unwrap()
      if (result.success) navigate('/')
    } catch (error) {
      setErrors({ submit: error.message || 'Registration failed' })
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join QuickBites today</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"/>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email"/>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"/>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Create a password"/>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Confirm your password"/>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-primary-dark text-black/80 py-3 px-4 rounded-lg 
              font-semibold from-amber-50 to-amber-100 cursor-pointer">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register