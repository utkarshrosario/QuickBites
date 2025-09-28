import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <div className="text-8xl mb-4">😵</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <div className="space-y-4">
            <Link to="/" className="block w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold">Go Home
            </Link>
            <Link to="/menu" className="block w-full bg-accent text-gray-900 py-3 px-4 rounded-lg font-semibold">Browse Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NotFound