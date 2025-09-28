import express from 'express';

const router = express.Router();
// GET /api/restaurants - Get all restaurants with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, search, rating, deliveryTime, sortBy = 'name', sortOrder = 'asc' } = req.query;
    const mockRestaurants = [
      {
        _id: '1',
        name: "Bella's Pizza Palace",
        description: "Authentic wood-fired pizzas with fresh ingredients and traditional recipes passed down through generations.",
        image: "",
        category: "Italian",
        rating: 4.8,
        deliveryTime: 25,
        deliveryFee: 2.99,
        minimumOrder: 15,
        isActive: true,
        address: {
          street: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA"
        },
        contact: {
          phone: "(555) 123-4567",
          email: "info@bellaspizza.com"
        },
        operatingHours: {
          monday: { open: "11:00", close: "22:00" },
          tuesday: { open: "11:00", close: "22:00" },
          wednesday: { open: "11:00", close: "22:00" },
          thursday: { open: "11:00", close: "22:00" },
          friday: { open: "11:00", close: "23:00" },
          saturday: { open: "11:00", close: "23:00" },
          sunday: { open: "12:00", close: "21:00" }
        }
      },
      {
        _id: '2',
        name: "Burger Junction",
        description: "Juicy gourmet burgers with creative toppings and crispy fries. From classic cheeseburgers to unique flavor combinations.",
        image: "",
        category: "Fast-food",
        rating: 4.6,
        deliveryTime: 20,
        deliveryFee: 1.99,
        minimumOrder: 10,
        isActive: true,
        address: {
          street: "456 Oak Avenue",
          city: "Los Angeles",
          state: "CA",
          zipCode: "90210",
          country: "USA"
        },
        contact: {
          phone: "(555) 987-6543",
          email: "orders@burgerjunction.com"
        },
        operatingHours: {
          monday: { open: "10:30", close: "22:00" },
          tuesday: { open: "10:30", close: "22:00" },
          wednesday: { open: "10:30", close: "22:00" },
          thursday: { open: "10:30", close: "22:00" },
          friday: { open: "10:30", close: "23:00" },
          saturday: { open: "10:30", close: "23:00" },
          sunday: { open: "11:30", close: "21:00" }
        }
      },
      {
        _id: '3',
        name: "Golden Noodle House",
        description: "Traditional ramen and noodle bowls with rich, flavorful broths made from scratch daily.",
        image: "",
        category: "Chinese",
        rating: 4.7,
        deliveryTime: 30,
        deliveryFee: 3.49,
        minimumOrder: 12,
        isActive: true,
        address: {
          street: "789 Pine Street",
          city: "San Francisco",
          state: "CA",
          zipCode: "94102",
          country: "USA"
        },
        contact: {
          phone: "(555) 456-7890",
          email: "hello@goldennoodle.com"
        },
        operatingHours: {
          monday: { open: "11:30", close: "21:30" },
          tuesday: { open: "11:30", close: "21:30" },
          wednesday: { open: "11:30", close: "21:30" },
          thursday: { open: "11:30", close: "21:30" },
          friday: { open: "11:30", close: "22:30" },
          saturday: { open: "11:30", close: "22:30" },
          sunday: { open: "12:00", close: "21:00" }
        },
      }
    ];
    // Filter mock data based on query parameters
    let filteredRestaurants = [...mockRestaurants];
    if (category && category !== 'all') {
      filteredRestaurants = filteredRestaurants.filter(r => r.category === category);
    }
    if (rating) {
      filteredRestaurants = filteredRestaurants.filter(r => r.rating >= parseFloat(rating));
    }
    if (deliveryTime) {
      filteredRestaurants = filteredRestaurants.filter(r => r.deliveryTime <= parseInt(deliveryTime));
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filteredRestaurants = filteredRestaurants.filter(r =>
        r.name.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower)
      );
    }
    // Sort restaurants
    filteredRestaurants.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'rating' || sortBy === 'deliveryTime') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }
    });
    res.json({ success: true, data: filteredRestaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching restaurants', error: error.message });
  }
});
// GET /api/restaurants/search - Search restaurants
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ success: false, message: 'Search query is required' });

    const searchResults = mockRestaurants.filter(restaurant =>
      restaurant.isActive && (
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(query.toLowerCase())
      )
    );

    res.json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error searching restaurants', error: error.message });
  }
});
// GET /api/restaurants/categories - Get all unique categories
router.get('/categories', async (req, res) => {
  try {
    const categories = ['all', 'fast-food', 'italian', 'chinese', 'mexican', 'japanese', 'cafe'];
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching categories', error: error.message });
  }
});
// GET /api/restaurants/:id - Get single restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = mockRestaurants.find(r => r._id === req.params.id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    if (!restaurant.isActive) {
      return res.status(404).json({ success: false, message: 'Restaurant is not active' });
    }
    res.json({ success: true, data: restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching restaurant', error: error.message });
  }
});
// POST /api/restaurants - Create new restaurant (Admin only - for now public)
router.post('/', async (req, res) => {
  try {
    const newRestaurant = {
      _id: String(mockRestaurants.length + 1),
      ...req.body,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    };
    mockRestaurants.push(newRestaurant);
    res.status(201).json({ success: true, message: 'Restaurant created successfully', data: newRestaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating restaurant', error: error.message });
  }
});
// PUT /api/restaurants/:id - Update restaurant
router.put('/:id', async (req, res) => {
  try {
    const index = mockRestaurants.findIndex(r => r._id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Restaurant not found'});
    mockRestaurants[index] = { ...mockRestaurants[index], ...req.body };
    res.json({ success: true, message: 'Restaurant updated successfully', data: mockRestaurants[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating restaurant', error: error.message });
  }
});
// DELETE /api/restaurants/:id - Delete restaurant
router.delete('/:id', async (req, res) => {
  try {
    const index = mockRestaurants.findIndex(r => r._id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    const deletedRestaurant = mockRestaurants.splice(index, 1)[0];
    res.json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting restaurant', error: error.message });
  }
});
export default router;