import { useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    // For now, just show an alert - this would be implemented with a backend API call
    alert('Profile update functionality will be implemented soon!')
    setIsEditing(false)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-accent p-6">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              <button onClick={() => setIsEditing(!isEditing)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} disabled={!isEditing} placeholder="Enter your delivery address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-50"/>
                </div>
              </div>
              {isEditing && (
                <div className="flex gap-4">
                  <button type="submit"
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors">
                    Cancel
                  </button>
                </div>
              )}
            </form>
            {/* Account Statistics */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-accent">$0</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Reviews Given</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Favorites</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile