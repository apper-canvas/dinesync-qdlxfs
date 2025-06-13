import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../utils/iconUtils';
import { toast } from 'react-toastify';
import MenuItemDetailModal from './MenuItemDetailModal';

const MenuSection = ({ selectionMode = false, onAddItem, selectedItems = [] }) => {
  const MenuIcon = getIcon('Utensils');
  const FilterIcon = getIcon('Filter');
  const PlusIcon = getIcon('Plus');
  const CheckIcon = getIcon('Check');
  const ShoppingBagIcon = getIcon('ShoppingBag');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Menu categories
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'main-courses', name: 'Main Courses' },
    { id: 'sides', name: 'Sides' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' }
  ];
  
  // State for active category
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Menu items data
  const menuItems = [
    {
      id: 1,
      name: "Truffle Risotto",
      description: "Creamy arborio rice slowly cooked with organic vegetable stock, wild porcini mushrooms, shallots, white wine, and finished with shaved black truffle and aged parmesan cheese.",
      price: 22.95,
      imageUrl: "https://images.unsplash.com/photo-1673796374363-75c873580651?auto=format&fit=crop&w=800&q=80",
      category: "main-courses",
      dietaryTags: ["Vegetarian", "Gluten-Free"]
    },
    {
      id: 2,
      name: "Herb-Crusted Salmon",
      description: "Wild-caught Atlantic salmon fillet coated with a blend of fresh dill, parsley, thyme, and breadcrumbs, pan-seared and served with a light lemon-dill butter sauce and seasonal vegetables.",
      price: 28.50,
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      category: "main-courses",
      dietaryTags: ["Gluten-Free", "Dairy-Free"]
    },
    {
      id: 3,
      name: "Braised Short Ribs",
      description: "Grass-fed beef short ribs braised for 8 hours in a rich reduction of Cabernet Sauvignon, beef stock, onions, carrots, celery, and aromatics, served with creamy mashed potatoes and glazed heirloom carrots.",
      price: 32.95,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      category: "main-courses",
      dietaryTags: ["Paleo"]
    },
    {
      id: 4,
      name: "Crispy Calamari",
      description: "Tender squid rings coated in a light rice flour and semolina batter, flash-fried to perfection, and served with house-made roasted garlic and lemon aioli, spicy marinara sauce, and fresh lemon wedges.",
      price: 16.50,
      imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
      category: "appetizers",
      dietaryTags: ["Seafood"]
    },
    {
      id: 5,
      name: "Artisanal Cheese Plate",
      description: "Curated selection of local and imported artisanal cheeses including aged cheddar, creamy brie, tangy goat cheese, and blue cheese, served with raw honeycomb, candied walnuts, dried fruits, and house-baked rosemary crackers.",
      price: 19.95,
      imageUrl: "https://images.unsplash.com/photo-1631379578550-d0bbcce7ec7c?auto=format&fit=crop&w=800&q=80",
      category: "appetizers",
      dietaryTags: ["Vegetarian"]
    },
    {
      id: 6,
      name: "Chocolate Lava Cake",
      description: "Rich Valrhona dark chocolate cake with a warm molten center, dusted with cocoa powder and served with Madagascar vanilla bean ice cream, fresh berries, and a drizzle of raspberry coulis.",
      price: 12.95,
      imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
      category: "desserts",
      dietaryTags: ["Vegetarian"]
    },
    {
      id: 7,
      name: "Crème Brûlée",
      description: "Traditional French custard made with premium vanilla beans, farm-fresh egg yolks, and heavy cream, topped with a hand-torched caramelized sugar crust that cracks perfectly with each spoonful.",
      price: 10.95,
      imageUrl: "https://images.unsplash.com/photo-1615577815766-199347f2e35c?auto=format&fit=crop&w=800&q=80",
      category: "desserts",
      dietaryTags: ["Vegetarian", "Gluten-Free"]
    },
    {
      id: 8,
      name: "Garlic Truffle Fries",
      description: "Russet potatoes hand-cut daily, double-fried for extra crispness, then tossed with roasted garlic, aged Parmigiano-Reggiano cheese, fresh parsley, and a light drizzle of imported black truffle oil. Served with house-made garlic aioli.",
      price: 9.95,
      imageUrl: "https://images.unsplash.com/photo-1580959375944-abd7e991f971?auto=format&fit=crop&w=800&q=80",
      category: "sides",
      dietaryTags: ["Vegetarian"]
    },
    {
      id: 9,
      name: "Signature Craft Cocktail",
      description: "Our bartender's seasonal creation featuring small-batch spirits, house-made infusions with herbs from our garden, fresh-squeezed citrus juices, artisanal bitters, and hand-carved ice. Ask your server for this season's selection.",
      price: 14.00,
      imageUrl: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
      category: "beverages",
      dietaryTags: []
    },
    {
      id: 10,
      name: "Artisanal Mocktail",
      description: "Sophisticated alcohol-free beverage crafted with cold-pressed organic fruit juices, house-made herb syrups, botanical extracts, sparkling water, and garnished with edible flowers and fresh herbs for a refreshing experience.",
      price: 9.50,
      imageUrl: "https://images.unsplash.com/photo-1619604395920-61d139cd5ee1?auto=format&fit=crop&w=800&q=80",
      category: "beverages",
      dietaryTags: ["Non-Alcoholic", "Vegan"]
    }
  ];
  
  // Filter menu items by category
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);
  
  // Check if item is in the selected items
  const isItemSelected = (itemId) => {
    return selectedItems.some(item => item.id === itemId);
  };
  
  // Get item quantity if selected
  const getItemQuantity = (itemId) => {
    const item = selectedItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  // Handle menu item click to show detail modal
  const handleMenuItemClick = (item) => {
    setShowModal(true);
    setSelectedItem(item);
    console.log("Menu item clicked:", item);
  };
  
  // Handle adding menu item to order when not in selection mode
  const handleAddMenuItem = (item) => {
    // Add item to cart (would normally dispatch to store or context)
    // For now, just show a success toast
    toast.success(`Added ${item.name} to your order`, {
      autoClose: 3000,
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    });
  };
  
  return (
    <section id="menu" className="scroll-mt-20">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Our Menu</h2>
      </div>
      
      {/* Category Filters */}
      <div className="flex items-center mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <div className="bg-accent/10 p-1.5 rounded-full mr-3">
          <FilterIcon className="w-4 h-4 text-accent" />
        </div>
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category.id 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
              } text-black`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id} 
              className="card cursor-pointer overflow-hidden"
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              transition={{ duration: 0.3 }}
              layout
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              onClick={() => handleMenuItemClick(item)}
            >
              <div className="flex h-full flex-col relative"> 
                <img src={item.imageUrl} alt={item.name} className="h-48 w-full object-cover rounded-t-lg -mx-6 -mt-6 mb-4" /> {/* Selection indicator for selection mode */}
                {selectionMode && isItemSelected(item.id) && (
                  <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                )}
                
                {/* Quantity badge if in selection mode and item is selected */}
                {selectionMode && getItemQuantity(item.id) > 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {getItemQuantity(item.id)}
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2 text-black">{item.name}</h3>
                <p className="text-black mb-4 flex-grow">{item.description}</p>
                <div className="flex justify-between items-end">
                  {!selectionMode ? (
                    <div className="flex flex-wrap gap-2">
                      {item.dietaryTags.map((tag) => (
                      <span key={tag} className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary-dark dark:bg-primary/20 text-black">{tag}</span>
                      ))}
                    </div>
                  ) : (
                    <button 
                      className="text-black hover:text-primary-dark flex items-center text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddItem && onAddItem(item);
                      }}
                    >
                      <PlusIcon className="w-4 h-4 mr-1" />
                      {isItemSelected(item.id) ? 'Add More' : 'Add to Order'}
                    </button>
                  )}
                  <span className="font-bold text-lg text-black">${item.price.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>  
          ))}
        </AnimatePresence>

      {/* Menu Item Detail Modal */}
      <AnimatePresence>
        {showModal && selectedItem && (
          <MenuItemDetailModal
            item={selectedItem}
            onClose={() => setShowModal(false)}
            selectionMode={selectionMode}
            onAddToOrder={(item) => selectionMode ? (onAddItem && onAddItem(item)) : handleAddMenuItem(item)} 
          />)}
      </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuSection;