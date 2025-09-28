import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getRestaurants } from '../features/restaurant/restaurantSlice'

const RestaurantList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const dispatch = useDispatch()
  const { restaurants, loading, error } = useSelector((state) => state.restaurant)

  useEffect(() => {
    dispatch(getRestaurants())
  }, [dispatch])
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || restaurant.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  const categories = ['all', ...new Set(restaurants.map(r => r.category))]
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurants...</p>
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 rounded-full p-4 mx-auto mb-4 w-fit">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={() => dispatch(getRestaurants())}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark">Try Again</button>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 mt-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-600 mb-10">Our Restaurants</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing restaurants in your area, from local favorites to international cuisine
          </p>
        </div>
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input type="text" placeholder="Search restaurants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            </div>
            <div className="md:w-64">
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" >
                {categories.map(category => (
                  <option key={category} value={category}>{category === 'all' ? 'All Categories' : category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Restaurant Grid */}
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <Link key={restaurant._id} to={`/restaurant/${restaurant._id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl" >
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10"></div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-primary">⭐ {restaurant.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded text-sm font-medium">
                      {restaurant.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{restaurant.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {restaurant.deliveryTime} mins • {restaurant.deliveryFee === 0 ? 'Free delivery' : `$${restaurant.deliveryFee} delivery`}
                    </span>
                    <span className="text-primary font-semibold">View Menu → </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default RestaurantList