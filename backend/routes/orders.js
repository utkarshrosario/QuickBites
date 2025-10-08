import express from 'express';

const router = express.Router();
let orders = [];
let orderId = 1;

router.post('/', async (req, res) => {
  try {
    const { items, customerInfo, paymentMethod } = req.body;

    if (!items?.length || !customerInfo?.firstName || !customerInfo?.email) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = (subtotal + 2.99 + subtotal * 0.08).toFixed(2);

    const order = {
      id: String(orderId++),
      items,
      total,
      customerInfo,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    orders.push(order);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Order creation failed' });
  }
});

router.get('/', (req, res) => {
  res.json({ success: true, data: orders });
});

router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, data: order });
});

export default router;