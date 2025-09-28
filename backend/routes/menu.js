import express from 'express';

const router = express.Router();
// GET /api/menu - Get all menu items with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, search, isAvailable = true, sortBy = 'name', sortOrder = 'asc' } = req.query;
    const mockMenuItems = [
      {
        _id: '1',
        name: 'Cheeseburger',
        description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
        price: 9.99,
        category: 'burgers',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center',
        isAvailable: true,
        restaurant: 'Burger Junction',
        restaurantId: '1'
      },
      {
        _id: '2',
        name: 'Chicken Ramen',
        description: 'Rich chicken broth with tender chicken, noodles, and vegetables',
        price: 11.50,
        category: 'other',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&crop=center',
        isAvailable: true,
        restaurant: 'Golden Noodle House',
        restaurantId: '2'
      },
      {
        _id: '3',
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan',
        price: 8.99,
        category: 'salads',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=center',
        isAvailable: true,
        restaurant: 'The Green Garden',
        restaurantId: '3'
      },
      {
        _id: '4',
        name: 'California Roll',
        description: 'Crab, avocado, and cucumber rolled in seaweed and rice',
        price: 13.99,
        category: 'other',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&crop=center',
        isAvailable: true,
        restaurant: 'Sushi Zen',
        restaurantId: '2'
      },
      {
        _id: '5',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomato sauce, and basil on thin crust',
        price: 12.99,
        category: 'pizza',
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
        isAvailable: true,
        restaurant: 'Bella\'s Pizza Palace',
        restaurantId: '1'
      },
      {
        _id: '6',
        name: 'French Fries',
        description: 'Crispy golden fries with sea salt and special seasoning',
        price: 4.99,
        category: 'sides',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center',
        isAvailable: true,
        restaurant: 'Burger Junction',
        restaurantId: '1'
      },
      {
        _id: '7',
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
        price: 6.99,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
        isAvailable: true,
        restaurant: 'Bella\'s Pizza Palace',
        restaurantId: '1'
      },
      {
        _id: '8',
        name: 'Greek Salad',
        description: 'Fresh cucumber, tomatoes, olives, feta cheese with olive oil dressing',
        price: 9.99,
        category: 'salads',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center',
        isAvailable: true,
        restaurant: 'The Green Garden',
        restaurantId: '3'
      }
    ];
    // Filter mock data based on query parameters
    let filteredItems = mockMenuItems.filter(item => item.isAvailable);
    if (category && category !== 'all') filteredItems = filteredItems.filter(item => item.category === category);
    if (search) {
      const searchLower = search.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }
    filteredItems.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'price') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }
    });
    res.json({ success: true, data: filteredItems });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching menu items', error: error.message });
  }
});
// GET /api/menu/categories - Get all unique categories
router.get('/categories', async (req, res) => {
  try {
    const categories = ['pizza', 'burgers', 'salads', 'sides', 'drinks', 'desserts', 'other'];
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching categories', error: error.message });
  }
});
// GET /api/menu/:id - Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const menuItem = mockMenuItems.find(item => item._id === req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.json({ success: true, data: menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching menu item', error: error.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const newItem = {
      _id: String(mockMenuItems.length + 1),
      ...req.body,
      isAvailable: req.body.isAvailable !== undefined ? req.body.isAvailable : true
    };
    mockMenuItems.push(newItem);
    res.status(201).json({ success: true, message: 'Menu item created successfully', data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating menu item', error: error.message });
  }
});
// PUT /api/menu/:id - Update menu item
router.put('/:id', async (req, res) => {
  try {
    const index = mockMenuItems.findIndex(item => item._id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Menu item not found' });
    mockMenuItems[index] = { ...mockMenuItems[index], ...req.body };
    res.json({ success: true, message: 'Menu item updated successfully', data: mockMenuItems[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating menu item', error: error.message });
  }
});
// DELETE /api/menu/:id - Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const index = mockMenuItems.findIndex(item => item._id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Menu item not found' });
    res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting menu item', error: error.message });
  }
});
export default router;