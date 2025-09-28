import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('all-items');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [menuRes, catRes] = await Promise.all([
          fetch('http://localhost:5000/api/menu'),
          fetch('http://localhost:5000/api/menu/categories')
        ]);
        const menuData = await menuRes.json();
        const catData = await catRes.json();
        setItems(menuData.data);
        setCategories(catData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const filteredItems = items.filter(item => {
    if (category !== 'all-items' && item.category !== category) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase()) &&
        !item.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    let aVal = a[sortBy], bVal = b[sortBy];
    if (sortBy === 'price') { aVal = parseFloat(aVal); bVal = parseFloat(bVal); }
    else { aVal = aVal.toString().toLowerCase(); bVal = bVal.toString().toLowerCase(); }
    return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
  });
  const addItemToCart = (item) => {
    dispatch(addToCart({ id: item._id, name: item.name, price: item.price, mage: item.image,
      restaurantId: item.restaurant || 'default'
    }));
  };
  const formatPrice = (price) => `$${parseFloat(price).toFixed(2)}`;
  const getCategoryIcon = (cat) => {
    const icons = {burgers: '🍔', pizza: '🍕', sides: '🍟', drinks: '🥤', desserts: '🍰', salads: '🥗', other: '🍽️'};
    return icons[cat] || '🍽️';
  };
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading menu...</p>
      </div>
    </div>
  );
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
      <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Menu</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
          Try Again
        </button>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 mt-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-600 mb-4">🍽️ Our Menu</h1>
          <p className="text-xl text-gray-600">Discover our delicious selection</p>
        </div>
        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <input type="text" placeholder="🔍 Search items..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:border-red-500"/>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setCategory('all-items')}
                className={`px-4 py-2 rounded-lg font-medium ${category === 'all-items' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                All
              </button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium ${category === cat ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {getCategoryIcon(cat)}
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500">
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="category">Category</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <img alt={item.name} className="w-full h-full object-cover"
                    src={item.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGNEY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvb2QgSW1hZ2U8L3RleHQ+PC9zdmc+'}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGNEY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvb2QgSW1hZ2U8L3RleHQ+PC9zdmc+';
                    }}
                  />
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <span className="text-lg font-bold text-red-600">{formatPrice(item.price)}</span>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <div className="mb-4">
                    <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {getCategoryIcon(item.category)}
                    </span>
                  </div>
                  <button onClick={() => addItemToCart(item)} className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${
                      item.isAvailable
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}>
                    {item.isAvailable ? '🛒 Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-1">{filteredItems.length}</div>
              <div className="text-gray-600">Items</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-1">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-1">
                {filteredItems.length > 0 ? formatPrice(Math.min(...filteredItems.map(item => item.price))) : '$0.00'}
              </div>
              <div className="text-gray-600">Starting From</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Menu;