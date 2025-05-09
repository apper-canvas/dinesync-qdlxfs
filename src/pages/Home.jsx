import { useState } from 'react';
import MainFeature from '../components/MainFeature';
import LocationMap from '../components/LocationMap';
import MenuSection from '../components/MenuSection';
import getIcon from '../utils/iconUtils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RatingsReviewsModal from '../components/RatingsReviewsModal';
import { motion } from 'framer-motion';

const Home = () => {
  // Define icons at the top of component
  const StarIcon = getIcon('Star');
  const ClockIcon = getIcon('Clock');
  const MapPinIcon = getIcon('MapPin');
  const UtensilsIcon = getIcon('Utensils');
  const ChevronDownIcon = getIcon('ChevronDown');
  
  const [showRatingsModal, setShowRatingsModal] = useState(false);
  const [showHours, setShowHours] = useState(false);
  
  // Sample restaurant data
  const featuredDishes = [
    {
      id: 1,
      name: "Truffle Risotto",
      
      description: "Creamy arborio rice with wild mushrooms and black truffle",
      price: 22.95,
      imageUrl: "https://images.unsplash.com/photo-1673796374363-75c873580651?auto=format&fit=crop&w=800&q=80",
      dietaryTags: ["Vegetarian", "Gluten-Free"]
    },
    {
      id: 2,
      name: "Herb-Crusted Salmon",
      description: "Sustainably-sourced salmon with herb crust and lemon butter sauce",
      price: 28.50,
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      dietaryTags: ["Gluten-Free", "Dairy-Free"]
    },
    {
      id: 3,
      name: "Braised Short Ribs",
      description: "Slow-cooked short ribs with red wine reduction and root vegetables",
      price: 32.95,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      dietaryTags: ["Paleo"]
    }
  ];

  const hours = {
    Monday: "11:00 AM - 9:00 PM",
    Tuesday: "11:00 AM - 9:00 PM",
    Wednesday: "11:00 AM - 9:00 PM",
    Thursday: "11:00 AM - 10:00 PM",
    Friday: "11:00 AM - 11:00 PM",
    Saturday: "10:00 AM - 11:00 PM",
    Sunday: "10:00 AM - 9:00 PM"
  };
  
  return (
    <div className="space-y-12">
      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false}
        newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      
      {/* Ratings and Reviews Modal */}
      <RatingsReviewsModal isOpen={showRatingsModal} onClose={() => setShowRatingsModal(false)} rating={4.8} />
        
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl h-[50vh] md:h-[60vh] bg-gradient-to-r from-primary-dark to-primary">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" 
          alt="Restaurant interior" 
          className="absolute w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Elevate Your Dining Experience
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl max-w-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Exquisite cuisine in an elegant atmosphere
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.a 
              href="#reservation"
              className="btn btn-primary text-lg px-8 py-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CalendarIcon className="w-5 h-5 mr-2" />
              Book a Table
            </motion.a>
            
            <motion.a 
              href="#menu"
              className="btn btn-outline bg-white/80 text-primary hover:bg-white text-lg px-8 py-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UtensilsIcon className="w-5 h-5 mr-2" />
              View Menu
            </motion.a>
            
            <motion.a 
              href="#takeout"
              className="btn btn-secondary text-lg px-8 py-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            Reserve a Table
          </motion.a>
        </div>
        </motion.div>
      </section>
      
      {/* Restaurant Info Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card flex items-center p-5 border-l-4 border-accent">
          <div className="bg-accent/10 p-3 rounded-full mr-4">
            <MapPinIcon className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Location</h3>
            <p className="text-surface-600 dark:text-surface-400">123 Culinary Avenue, Foodville</p>
          </div>
          <a href="#find-us" className="text-primary hover:text-primary-dark ml-2">View Map</a>
        </div>
        
        <div className="card flex items-center p-5 border-l-4 border-accent cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowRatingsModal(true)}>
          <div className="bg-accent/10 p-3 rounded-full mr-4">
            <StarIcon className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Rating</h3>
            <p className="text-surface-600 dark:text-surface-400">4.8/5 from 200+ reviews</p>            
          </div>
          <span className="text-primary hover:text-primary-dark ml-2">View Reviews</span>
        </div>
        
        <div className="card flex items-center p-5 border-l-4 border-accent relative">
          <div className="bg-accent/10 p-3 rounded-full mr-4">
            <ClockIcon className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Hours</h3>
            <p className="text-surface-600 dark:text-surface-400">Open Today: {hours[new Date().toLocaleDateString('en-US', { weekday: 'long' })]}</p>
          </div>
          <button 
            onClick={() => setShowHours(!showHours)}
            className="ml-auto text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
            aria-label="Show hours"
          >
            <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${showHours ? 'transform rotate-180' : ''}`} />
          </button>
          
          {showHours && (
            <motion.div 
              className="absolute top-full left-0 right-0 mt-2 z-10 bg-white dark:bg-surface-800 shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4">
                {Object.entries(hours).map(([day, time]) => (
                  <div key={day} className="flex justify-between py-1">
                    <span className="font-medium">{day}</span>
                    <span className="text-surface-600 dark:text-surface-400">{time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Featured Dishes */}
      <section>
        <div className="flex items-center mb-6">
          <UtensilsIcon className="w-6 h-6 mr-2 text-accent" />
          <h2 className="text-2xl md:text-3xl font-bold">Featured Dishes</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish) => (
            <motion.div 
              key={dish.id}
              className="card group overflow-hidden"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-52 mb-4 overflow-hidden rounded-lg -mx-6 -mt-6">
                <img 
                  src={dish.imageUrl} 
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-3 line-clamp-2">{dish.description}</p>
              <div className="flex justify-between items-end">
                <div className="flex flex-wrap gap-2">
                  {dish.dietaryTags.map((tag) => (
                    <span key={tag} className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary-dark dark:bg-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-bold text-lg">${dish.price.toFixed(2)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Menu Section */}
      <section id="menu" className="mt-12 pt-8 border-t border-surface-200 dark:border-surface-700 scroll-mt-20">
        <MenuSection />
      </section>
      
      {/* Location Map Section */}
      <section id="find-us" className="scroll-mt-20">
        <div className="flex items-center mb-6">
          <MapPinIcon className="w-6 h-6 mr-2 text-accent" />
          <h2 className="text-2xl md:text-3xl font-bold">Our Location</h2>
        </div>
        
        <div>
          <LocationMap />
        </div>
      </section>
      
      {/* Takeout Order Section */}
      <section id="takeout" className="scroll-mt-20 mt-12 pt-8 border-t border-surface-200 dark:border-surface-700">
        <div className="flex items-center mb-6">
          <ShoppingBagIcon className="w-6 h-6 mr-2 text-accent" />
          <h2 className="text-2xl md:text-3xl font-bold">Order Takeout</h2>
        </div>
        
        <div className="card text-center py-8">
          <h3 className="text-xl font-bold mb-4">Ready to enjoy our cuisine at home?</h3>
          <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-2xl mx-auto">
            Order takeout directly from our restaurant and have your favorite dishes ready for pickup in 30-45 minutes.
          </p>
          <button className="btn btn-secondary text-lg px-8 py-3 shadow-lg font-medium">Order Now</button>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section id="reservation" className="scroll-mt-20">
        <MainFeature />
      </section>
    </div>
  );
};

export default Home;