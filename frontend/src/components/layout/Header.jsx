import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 border-gray-200 shadow-smh-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold font-accent bg-gradient-to-r from-red-600 to-amber-400 bg-clip-text text-transparent hover:scale-105 cursor-pointer">
            QuickBites
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <Link to="/menu" className="text-gray-700 font-medium px-3 py-2 rounded-lg hover:text-red-600 hover:bg-red-50 hover:-translate-y-0.5 relative overflow-hidden">
              <span className="relative">🍽️ Menu</span>
              <div className="absolute"></div>
            </Link>
            <Link to="/restaurants" className="text-gray-700 font-medium px-3 py-2 rounded-lg hover:text-red-600 hover:bg-red-50 hover:-translate-y-0.5 relative overflow-hidden">
              <span className="relative">🏪 Restaurants</span>
              <div className="absolute"></div>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="text-gray-700 font-medium px-3 py-2 rounded-lg hover:text-red-600 hover:bg-red-50 hover:-translate-y-0.5 relative overflow-hidden">
                  <span className="relative">🛒 Cart</span>
                  <div className="absolute"></div>
                </Link>
                <Link to="/orders" className="text-gray-700 font-medium px-3 py-2 rounded-lg hover:text-red-600 hover:bg-red-50 hover:-translate-y-0.5 relative overflow-hidden">
                  <span className="relative">📋 Orders</span>
                  <div className="absolute"></div>
                </Link>
                <Link to="/profile" className="text-gray-700 font-medium px-3 py-2 rounded-lg hover:text-red-600 hover:bg-red-50 hover:-translate-y-0.5 relative overflow-hidden">
                  <span className="relative">👤 User</span>
                  <div className="absolute"></div>
                </Link>
                <button onClick={handleLogout} className="text-gray-700 font-medium px-3 py-2 rounded-lg hover:text-red-600 hover:bg-red-50 hover:-translate-y-0.5 relative overflow-hidden">
                  <span className="relative">🚪 Logout</span>
                  <div className="absolute"></div>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 font-medium px-3 py-2 rounded-lg hover:text-red-600 hover:bg-red-50 hover:-translate-y-0.5 relative overflow-hidden">
                  <span className="relative">🔑 Login</span>
                  <div className="absolute"></div>
                </Link>
                <Link to="/register" className="text-gray-700 font-medium px-3 py-2 rounded-lg hover:text-red-600 hover:bg-red-50 hover:-translate-y-0.5 relative overflow-hidden">
                  <span className="relative">📝 Register</span>
                  <div className="absolute"></div>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
export default Header