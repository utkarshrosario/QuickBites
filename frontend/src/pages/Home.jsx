import { Link } from 'react-router-dom'
import { FaStar, FaClock, FaShieldAlt, FaTruck } from 'react-icons/fa'

const Home = () => {
  return (
    <div className="min-h-screen bg-red-600 text-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 xl:py-40 overflow-hidden bg-gradient-to-br from-red-600 to-amber-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Logo and Brand */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-6 mb-6">
                <span className="text-6xl bg-gradient-to-br from-amber-400 to-amber-600 rounded-full w-20 h-20 flex items-center justify-center">🍔
                </span>
                <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-white to-amber-200 bg-clip-text">QuickBites</h1>
              </div>
              <p className="text-2xl lg:text-3xl font-medium text-white/90">Delicious Food, Delivered Fast</p>
            </div>
            {/* Hero Content */}
            <div className="mb-12">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8">Your Favorite Food,<br />
                <span className="bg-gradient-to-r">Delivered Hot & Fresh</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-normal">
                Order from the best restaurants in your city and get delicious food delivered to your door in minutes. Fast, fresh, and always on time.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Link to="/restaurants" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold text-lg rounded-2xl justify-center relative overflow-hidden">
                  <FaTruck />
                  <span className="relative">Order Now</span>
                  <div className="absolute bg-gradient-to-r"></div>
                </Link>
                <Link to="/menu" className="inline-flex items-center gap-3 px-8 py-4 text-black font-bold text-lg rounded-2xl shadow-sm hover:bg-amber-400 justify-center">
                  Browse Menu
                </Link>
              </div>
            </div>
            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 lg:gap-12">
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-xl text-white/90">
                <FaClock className="text-amber-400 text-xl" />
                <span className="font-medium">15-30 min delivery</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-xl text-white/90">
                <FaStar className="text-amber-400 text-xl" />
                <span className="font-medium">4.8★ rating</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-xl text-white/90">
                <FaShieldAlt className="text-amber-400 text-xl" />
                <span className="font-medium">100% safe & secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="relative py-20 lg:py-24 bg-gradient-to-br from-white to-amber-400 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Why Choose QuickBites?</h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto leading-normal">Experience the best food delivery service in town</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-orange-300 rounded-xl p-8 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-5xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Lightning Fast Delivery</h3>
              <p className="text-gray-600">Get your favorite meals delivered in 15-30 minutes, hot and fresh to your door</p>
            </div>
            <div className="bg-orange-300 rounded-xl p-8 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-5xl">👑</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Premium Quality</h3>
              <p className="text-gray-600">Only the finest restaurants and freshest ingredients for an exceptional dining experience</p>
            </div>
            <div className="bg-orange-300 rounded-xl p-8 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-5xl">🥡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Secure & Safe</h3>
              <p className="text-gray-600">100% contactless delivery with sanitized packaging and safety measures</p>
            </div>
            <div className="bg-orange-300 rounded-xl p-8 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-5xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Best Value</h3>
              <p className="text-gray-600">Competitive prices with exclusive deals, discounts, and loyalty rewards</p>
            </div>
          </div>
        </div>
      </section>
      {/* Popular Restaurants Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-gray-100 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r">Popular Restaurants</h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto">Discover the most loved dining spots in your area</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl overflow-hidden border-gray-200">
              <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                <div className="absolute top-4 right-4 bg-white/95 rounded-2xl px-3 py-2">
                  <div className="text-red-600 font-bold text-sm">⭐ 4.8</div>
                  <div className="text-gray-600 text-xs">15-25 min</div>
                </div>
                <div className="text-6xl">🍕</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Bella's Pizza Palace</h3>
                <p className="text-gray-600 text-sm mb-3">Italian • ⭐ 4.8 • 15-25 min</p>
                <p className="text-gray-600 text-sm mb-4 ">Authentic wood-fired pizzas with fresh ingredients and traditional recipes</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-200 text-red-600 text-xs rounded-full">Bestseller</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-200 text-red-600 text-xs rounded-full">Family Friendly</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
              <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                <div className="absolute top-4 right-4 bg-white/95 rounded-2xl px-3 py-2">
                  <div className="text-red-600 font-bold text-sm">⭐ 4.6</div>
                  <div className="text-gray-600 text-xs">20-30 min</div>
                </div>
                <div className="text-6xl">🍔</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Burger Junction</h3>
                <p className="text-gray-600 text-sm mb-3">American • ⭐ 4.6 • 20-30 min</p>
                <p className="text-gray-600 text-sm mb-4">Juicy gourmet burgers with creative toppings and crispy fries</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-200 text-red-600 text-xs rounded-full">Popular</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-200 text-red-600 text-xs rounded-full">Quick Bites</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
              <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                <div className="absolute top-4 right-4 bg-white/95 rounded-2xl px-3 py-2">
                  <div className="text-red-600 font-bold text-sm">⭐ 4.7</div>
                  <div className="text-gray-600 text-xs">25-35 min</div>
                </div>
                <div className="text-6xl">🍜</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Golden Noodle House</h3>
                <p className="text-gray-600 text-sm mb-3">Asian • ⭐ 4.7 • 25-35 min</p>
                <p className="text-gray-600 text-sm mb-4">Traditional ramen and noodle bowls with rich, flavorful broths</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-200 text-red-600 text-xs rounded-full">Healthy</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-200 text-red-600 text-xs rounded-full">Vegetarian Options</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link to="/restaurants" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-400 to-red-700 text-white text-md rounded-xl justify-center">
              Explore All Restaurants
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Home;