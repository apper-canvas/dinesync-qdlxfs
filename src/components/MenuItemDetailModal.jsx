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
    // Call parent component's onAddToOrder multiple times based on quantity
    const itemWithQuantity = {
      ...item,
      quantity: quantity
    };
    
    onAddToOrder(itemWithQuantity);
    if (!selectionMode) {
      toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to your order`);
    }
    onClose();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={stopPropagation}
      >
        <div className="relative h-64">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button 
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            onClick={onClose}
          >
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
              <span className="px-4 py-2 font-medium text-black dark:text-white">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="p-2 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-black dark:text-white">
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button onClick={handleAddToOrder} className="w-full btn btn-primary py-3 flex items-center justify-center">
            <ShoppingBagIcon className="w-5 h-5 mr-2" /> Add to Order (${(item.price * quantity).toFixed(2)})
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MenuItemDetailModal;