import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getRestaurantById } from '../features/restaurant/restaurantSlice'

const RestaurantDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedRestaurant: restaurant, loading, error } = useSelector((state) => state.restaurant)

  useEffect(() => {
    if (id) {
      dispatch(getRestaurantById(id))
    }
  }, [dispatch, id])
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurant details...</p>
        </div>
      </div>
    )
  }
  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 rounded-full p-4 mx-auto mb-4 w-fit">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant not found</h2>
          <p className="text-gray-600 mb-4">The restaurant you're looking for doesn't exist.</p>
          <Link to="/restaurants" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors">
            Back to Restaurants
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/restaurants" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors">
            ← Back to Restaurants
          </Link>
        </div>
        {/* Restaurant Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 relative">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-6 right-6 bg-white bg-opacity-90 rounded-full px-4 py-2">
              <span className="text-lg font-bold text-primary">
                ⭐ {restaurant.rating}
              </span>
            </div>
            <div className="absolute bottom-6 left-6">
              <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {restaurant.category}
              </span>
            </div>
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{restaurant.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{restaurant.description}</p>
            <div className="flex items-center gap-6 text-gray-600">
              <span>⏱️ {restaurant.deliveryTime} mins delivery</span>
              <span>🚚 {restaurant.deliveryFee === 0 ? 'Free delivery' : `$${restaurant.deliveryFee} delivery`}</span>
              <span>📍 {restaurant.location}</span>
            </div>
          </div>
        </div>
        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurant.menuItems?.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-lg font-bold text-primary">${item.price}</span>
                </div>
                <p className="text-gray-600 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{item.category}</span>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default RestaurantDetail