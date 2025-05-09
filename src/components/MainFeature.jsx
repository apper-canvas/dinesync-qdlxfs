import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MenuSection from './MenuSection';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Define icons at the top of component
  const CalendarIcon = getIcon('Calendar');
  const UsersIcon = getIcon('Users');
  const ClockIcon = getIcon('Clock');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  const PhoneIcon = getIcon('Phone');
  const MessageSquareIcon = getIcon('MessageSquare');
  const ChevronRightIcon = getIcon('ChevronRight');
  const ShoppingBagIcon = getIcon('ShoppingBag');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const CheckSquareIcon = getIcon('CheckSquare');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: 2,
    specialRequests: ''
  });

  // Time slots
  const timeSlots = [
    '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', 
    '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
  ];
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Success state
  const [isSuccess, setIsSuccess] = useState(false);

  // Selected menu items state
  const [selectedItems, setSelectedItems] = useState([]);

  // Show menu selection state
  const [showMenuSelection, setShowMenuSelection] = useState(false);

  // Calculate min date (today)
  const today = new Date().toISOString().split('T')[0];

  // Show confirmation state
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle party size changes
  const adjustPartySize = (amount) => {
    setFormData(prev => ({
      ...prev,
      partySize: Math.max(1, Math.min(20, prev.partySize + amount))
    }));
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^\d]/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Reservation submitted successfully!", {
        position: "top-right",
        icon: "🍽️",
        autoClose: 5000
      });
    }, 1500);
  };

  // Handle menu selection
  const handleAddMenuItem = (item) => {
    // Check if item already exists in selectedItems
    const exists = selectedItems.find(selectedItem => selectedItem.id === item.id);
    
    if (exists) {
      // If exists, update quantity
      const updatedItems = selectedItems.map(selectedItem => 
        selectedItem.id === item.id ? {...selectedItem, quantity: selectedItem.quantity + 1} : selectedItem
      );
      setSelectedItems(updatedItems);
      toast.info(`Added another ${item.name} to your order`, { autoClose: 2000 });
    } else {
      // If doesn't exist, add to selectedItems with quantity 1
      setSelectedItems([...selectedItems, {...item, quantity: 1}]);
      toast.success(`Added ${item.name} to your order`, { autoClose: 2000 });
    }
  };

  // Handle removing menu item
  const handleRemoveMenuItem = (itemId) => {
    const item = selectedItems.find(item => item.id === itemId);
    
    if (item.quantity > 1) {
      // Decrease quantity
      const updatedItems = selectedItems.map(selectedItem => 
        selectedItem.id === itemId ? {...selectedItem, quantity: selectedItem.quantity - 1} : selectedItem
      );
      setSelectedItems(updatedItems);
      toast.info(`Removed one ${item.name} from your order`, { autoClose: 2000 });
    } else {
      // Remove item completely
      const updatedItems = selectedItems.filter(item => item.id !== itemId);
      setSelectedItems(updatedItems);
      toast.error(`Removed ${item.name} from your order`, { autoClose: 2000 });
    }
  };

  // Handle finalizing the order
  const handleFinalizeOrder = () => {
    toast.success("Your order has been finalized!", {
      position: "top-right",
      icon: "✅",
      autoClose: 5000
    });

    // Show confirmation instead of resetting
    setShowConfirmation(true);
    
    // Reset form state but keep the data for display
    setTimeout(() => {
      // Keep the data to display in the confirmation
      setSelectedItems([]);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        partySize: 2,
        specialRequests: ''
      });
    }, 8000);
  };

  // Handle starting a new reservation
  const handleStartNewReservation = () => {
    setShowConfirmation(false);
    setShowMenuSelection(false);
    setIsSuccess(false);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate total price
  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Handle proceeding to menu selection
  const handleProceedToMenuSelection = () => {
    setShowMenuSelection(true);
  };

  return (
    <div className="relative">
      <div className="flex items-center mb-6">
        <CalendarIcon className="w-6 h-6 mr-2 text-accent" />
        <h2 className="text-2xl md:text-3xl font-bold">Reserve a Table</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-3 space-y-6">
          {isSuccess && !showMenuSelection ? (
            // Success but hasn't proceeded to menu selection yet
            <motion.div
              key="success-message"
              exit={{ opacity: 0, height: 0 }}
              className="card border-2 border-green-500 bg-green-50 dark:bg-green-900/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800/40 rounded-full flex items-center justify-center mb-4">
                  <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Reservation Confirmed!</h3>
                <p className="text-surface-600 dark:text-surface-300 mb-4">
                  We've sent a confirmation to your email.
                </p>
                <div className="bg-white dark:bg-surface-800 rounded-lg p-4 w-full max-w-sm shadow-sm border border-surface-200 dark:border-surface-700">
                  <div className="flex justify-between mb-2">
                    <span className="text-surface-500 dark:text-surface-400">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-surface-500 dark:text-surface-400">Date:</span>
                    <span className="font-medium">{formatDate(formData.date)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-surface-500 dark:text-surface-400">Time:</span>
                    <span className="font-medium">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500 dark:text-surface-400">Party Size:</span>
                    <span className="font-medium">{formData.partySize} {formData.partySize === 1 ? 'guest' : 'guests'}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleProceedToMenuSelection}
                  className="mt-6 btn btn-primary py-3 px-6 text-lg font-medium flex items-center justify-center"
                >
                  <ShoppingBagIcon className="w-5 h-5 mr-2" />
                  Add Menu Items to Your Reservation
                </button>
              </div>
            </motion.div>
          ) : isSuccess && showConfirmation ? (
            // Order confirmation view
            <motion.div
              key="order-confirmation"
              className="card border-2 border-green-500 bg-green-50 dark:bg-green-900/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800/40 rounded-full flex items-center justify-center mb-4">
                  <CheckSquareIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Order Complete!</h3>
                <p className="text-surface-600 dark:text-surface-300 mb-6">
                  Your reservation and menu selections have been confirmed.
                </p>

                <div className="w-full max-w-2xl mx-auto">
                  <h4 className="text-lg font-semibold text-left mb-3 flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
                    Reservation Details
                  </h4>
                  <div className="bg-white dark:bg-surface-800 rounded-lg p-4 mb-6 shadow-sm border border-surface-200 dark:border-surface-700 text-left">
                    <div className="grid grid-cols-2 gap-4">
                      <div><span className="text-surface-500 dark:text-surface-400">Name:</span> <span className="font-medium">{formData.name}</span></div>
                      <div><span className="text-surface-500 dark:text-surface-400">Party Size:</span> <span className="font-medium">{formData.partySize} {formData.partySize === 1 ? 'guest' : 'guests'}</span></div>
                      <div><span className="text-surface-500 dark:text-surface-400">Date:</span> <span className="font-medium">{formatDate(formData.date)}</span></div>
                      <div><span className="text-surface-500 dark:text-surface-400">Time:</span> <span className="font-medium">{formData.time}</span></div>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-left mb-3 flex items-center">
                    <ShoppingBagIcon className="w-5 h-5 mr-2 text-primary" />
                    Menu Selections
                  </h4>
                  <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-sm border border-surface-200 dark:border-surface-700 text-left mb-6">
                    {selectedItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0 border-surface-100 dark:border-surface-700">
                        <div>{item.name} <span className="text-surface-500 dark:text-surface-400">× {item.quantity}</span></div>
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-4 mt-2 border-t border-surface-200 dark:border-surface-700 font-bold">
                      <span>Total:</span>
                      <span className="text-xl text-primary">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button onClick={handleStartNewReservation} className="btn btn-primary mt-2">Make Another Reservation</button>
              </div>
            </motion.div>
          ) : isSuccess && showMenuSelection && !showConfirmation ? (
            // Menu selection view
            <motion.div
              key="menu-selection"
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setShowMenuSelection(false)} 
                  className="flex items-center text-sm text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-1" />
                  Back to Reservation Details
                </button>
              
              {/* Order Summary Card */}
              <div className="card bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                <h4 className="font-bold text-lg mb-4">Your Order Summary</h4>
                
                {selectedItems.length === 0 ? (
                  <div className="py-6 text-center text-surface-500 dark:text-surface-400">
                    <ShoppingBagIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Your order is empty. Select items from the menu below.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {selectedItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-white dark:bg-surface-700 rounded-lg">
                          <div className="flex items-center">
                            <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3" />
                            <div>
                              <h5 className="font-medium">{item.name}</h5>
                              <p className="text-sm text-surface-500 dark:text-surface-400">${item.price.toFixed(2)} × {item.quantity}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-3">${(item.price * item.quantity).toFixed(2)}</span>
                            <button 
                              onClick={() => handleRemoveMenuItem(item.id)}
                              className="p-1 text-surface-500 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <XIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-surface-200 dark:border-surface-700">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold text-xl text-primary">${calculateTotal().toFixed(2)}</span>
                    </div>
                    
                    <button
                      onClick={handleFinalizeOrder}
                      className="w-full btn btn-primary mt-4 py-3"
                      disabled={selectedItems.length === 0}
                    >
                      Finalize Order
                    </button>
                  </>
                )}
              </div>
              
              {/* Menu Items Selection */}
              <MenuSection selectionMode={true} onAddItem={handleAddMenuItem} selectedItems={selectedItems} />
              
              </div>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit}
              className="card space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              {/* Contact Info - 2 Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="label">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input pl-10 ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="your@email.com"
                    />
                    <MessageSquareIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="label">Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input pl-10 ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="(123) 456-7890"
                    />
                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>
              
              {/* Date and Time - 2 Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="label">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={today}
                      className={`input ${errors.date ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                  </div>
                  {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                </div>
                
                <div>
                  <label htmlFor="time" className="label">Time</label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`input ${errors.time ? 'border-red-500 dark:border-red-500' : ''}`}
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
                </div>
              </div>
              
              {/* Party Size Selector */}
              <div>
                <label htmlFor="partySize" className="label">Party Size</label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center rounded-l-lg bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                    onClick={() => adjustPartySize(-1)}
                    disabled={formData.partySize <= 1}
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                  <div className="w-20 h-10 flex items-center justify-center border-t border-b border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 font-medium">
                    {formData.partySize}
                  </div>
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center rounded-r-lg bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                    onClick={() => adjustPartySize(1)}
                    disabled={formData.partySize >= 20}
                  >
                    <UsersIcon className="w-5 h-5" />
                  </button>
                  <span className="ml-3 text-surface-600 dark:text-surface-400">
                    {formData.partySize === 1 ? 'guest' : 'guests'}
                  </span>
                </div>
              </div>
              
              {/* Special Requests */}
              <div>
                <label htmlFor="specialRequests" className="label">Special Requests (Optional)</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="3"
                  className="input"
                  placeholder="Allergies, dietary restrictions, special occasions, etc."
                ></textarea>
              </div>
              
              {/* Submit Button */}
              <div className="!mt-8">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn btn-primary py-3 text-lg font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Reservation
                      <ChevronRightIcon className="ml-2 w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </div>
        
        {/* Info Column */}
        <div className="lg:col-span-2">
          <motion.div 
            className="card bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20 h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 text-primary-dark dark:text-primary-light">Reservation Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-white dark:bg-surface-700 p-2 rounded-full shadow-sm mr-4">
                  <ClockIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Reservation Hours</h4>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    Lunch: 11:30 AM - 2:30 PM<br />
                    Dinner: 5:30 PM - 9:30 PM
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white dark:bg-surface-700 p-2 rounded-full shadow-sm mr-4">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Reservation Policy</h4>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    Reservations can be made up to 30 days in advance. A 15-minute grace period is provided for all reservations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white dark:bg-surface-700 p-2 rounded-full shadow-sm mr-4">
                  <UsersIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Large Parties</h4>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    For parties of 8 or more, please call us directly at (555) 123-4567 to arrange your reservation.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-primary/20">
                <div className="bg-white dark:bg-surface-800 rounded-lg overflow-hidden shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0" 
                    alt="Restaurant interior"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-center">We look forward to serving you!</h4>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;