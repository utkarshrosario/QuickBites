import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, total } = useSelector((state) => state.cart)

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zipCode: '', paymentMethod: 'card'
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items, total, customerInfo: formData, paymentMethod: formData.paymentMethod
        })
      })

      const result = await response.json()
      if (result.success) {
        dispatch(clearCart())
        navigate('/orders')
      } else {
        alert(`Error: ${result.message}`)
      }
    } catch (error) {
      alert('Error placing order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Cart is empty</h2>
          <Link to="/menu" className="bg-blue-600 text-white px-4 py-2 rounded">
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  const finalTotal = (total + 2.99 + total * 0.08).toFixed(2)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="firstName" required placeholder="First Name"
                value={formData.firstName} onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                name="lastName" required placeholder="Last Name"
                value={formData.lastName} onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            <input
              name="email" type="email" required placeholder="Email"
              value={formData.email} onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <input
              name="phone" type="tel" required placeholder="Phone"
              value={formData.phone} onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <input
              name="address" required placeholder="Address"
              value={formData.address} onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="city" required placeholder="City"
                value={formData.city} onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                name="zipCode" required placeholder="ZIP Code"
                value={formData.zipCode} onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Payment Method</label>
              <label className="flex items-center">
                <input type="radio" name="paymentMethod" value="card" className="mr-2"
                       checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                Credit/Debit Card
              </label>
              <label className="flex items-center">
                <input type="radio" name="paymentMethod" value="cash" className="mr-2"
                       checked={formData.paymentMethod === 'cash'} onChange={handleChange} />
                Cash on Delivery
              </label>
            </div>

            <button
              type="submit" disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-3 rounded disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : `Place Order - $${finalTotal}`}
            </button>
          </form>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${finalTotal}</span>
              </div>
            </div>

            <Link to="/cart" className="text-blue-600 hover:underline mt-4 inline-block">
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout