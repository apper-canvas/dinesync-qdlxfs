import { useState } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';
import { toast } from 'react-toastify';

const MenuItemDetailModal = ({ item, onClose, onAddToOrder = () => {}, selectionMode = false }) => {
  const [quantity, setQuantity] = useState(1);
  const XIcon = getIcon('X');
  const MinusIcon = getIcon('Minus');
  const PlusIcon = getIcon('Plus');
  const ShoppingBagIcon = getIcon('ShoppingBag');

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, quantity + amount);
    setQuantity(newQuantity);
  };

  const handleAddToOrder = () => {
    // Create an item with quantity information
    const itemWithQuantity = {
      ...item,
      quantity: quantity
    };
    
    onAddToOrder(itemWithQuantity);
    
    if (!selectionMode) {
      toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to your order`, {
        position: "top-right",
        autoClose: 3000
      });
    }
    onClose();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={stopPropagation}
      >
        <div className="relative h-64">
          <img 
            src={item.imageUrl}
            className="w-full h-full object-cover"
          />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-surface-800/80 rounded-full text-surface-800 dark:text-surface-100 hover:bg-white dark:hover:bg-surface-700">
            <XIcon className="w-5 h-5" />
          </button>
          
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">{item.name}</h2>
          <p className="text-surface-600 dark:text-surface-300 mb-4">{item.description}</p>
          
          {item.dietaryTags && item.dietaryTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {item.dietaryTags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-dark dark:bg-primary/20 dark:text-primary-light">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-6 mb-6">
            <div className="text-2xl font-bold text-black dark:text-white">${item.price.toFixed(2)}</div>
            <div className="flex items-center border border-surface-200 dark:border-surface-600 rounded-lg overflow-hidden">
              <button onClick={() => handleQuantityChange(-1)} className="p-2 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-black dark:text-white">
                <MinusIcon className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 min-w-[40px] text-center font-medium text-black dark:text-white">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="p-2 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-black dark:text-white">
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-surface-50 dark:bg-surface-700 rounded-lg mb-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Total for {quantity} {quantity > 1 ? 'items' : 'item'}:</span>
              <span className="text-lg font-bold text-primary">${(item.price * quantity).toFixed(2)}</span>
            </div>
          </div>
          <button onClick={handleAddToOrder} className="w-full btn btn-primary py-3 flex items-center justify-center">
            <ShoppingBagIcon className="w-5 h-5 mr-2" /> ADD TO PLACE ORDER
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MenuItemDetailModal;