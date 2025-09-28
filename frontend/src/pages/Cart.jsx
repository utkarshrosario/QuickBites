import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, total, itemCount } = useSelector((state) => state.cart)

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity }))
    }
  }
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
            <Link to="/menu"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark inline-block">
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 mt-15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <button onClick={handleClearCart}className="text-red-600 font-medium cursor-pointer">Clear Cart</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Items ({itemCount})</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🍕</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">${item.price} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                        <button onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-700 text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">$2.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${(total * 0.08).toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${(total + 2.99 + total * 0.08).toFixed(2)}</span>
                </div>
              </div>
              <Link to="/checkout" className="w-full text-white py-3 px-4 rounded-lg font-semibold bg-amber-300 block text-center">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cart