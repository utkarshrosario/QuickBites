import { useState } from 'react'

const Orders = () => {
  const [filter, setFilter] = useState('all')
  const [orders] = useState([
    {
      id: '001',
      status: 'delivered',
      createdAt: '2025-08-03T10:30:00Z',
      deliveryAddress: '123 Main St, City, State 12345',
      total: 45.99,
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 15.99 },
        { name: 'Caesar Salad', quantity: 1, price: 8.99 },
        { name: 'Garlic Bread', quantity: 1, price: 5.02 }
      ]
    },
    {
      id: '002',
      status: 'preparing',
      createdAt: '2025-08-14T18:45:00Z',
      deliveryAddress: '456 Oak Ave, City, State 23456',
      total: 32.50,
      items: [
        { name: 'Pepperoni Pizza', quantity: 1, price: 18.99 },
        { name: 'Chicken Wings', quantity: 1, price: 12.99 },
        { name: 'Soda', quantity: 1, price: 2.52 }
      ]
    }
  ])
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-orange-100 text-orange-800'
      case 'out-for-delivery': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 mt-15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your food orders</p>
        </div>
        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered'].map((status) => (
              <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 rounded-lg font-medium ${
                  filter === status
                    ? 'text-white'
                    : 'bg-slate-400 text-gray-700 hover:bg-gray-200'
                }`}>
                {status === 'out-for-delivery' ? 'Out for Delivery' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all'
                  ? "You haven't placed any orders yet. Start by browsing our menu!"
                  : `No ${filter} orders found.`}
              </p>
              <a href="/menu" className="bg-primary text-white px-6 py-3 rounded-lg inline-block">Menu</a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()} at{' '}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status === 'out-for-delivery' ? 'Out for Delivery' : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-lg">🍕</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Delivery Address</p>
                        <p className="font-medium text-gray-900">{order.deliveryAddress}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-xl font-bold text-primary">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default Orders