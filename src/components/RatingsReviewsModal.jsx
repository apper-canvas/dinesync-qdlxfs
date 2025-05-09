import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const RatingsReviewsModal = ({ isOpen, onClose, rating }) => {
  const StarIcon = getIcon('Star');
  const XIcon = getIcon('X');
  
  // Mock reviews data - in a real app, this would come from API/props
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      date: "2023-10-15",
      rating: 5,
      comment: "Absolutely amazing experience! The food was exquisite and the service was impeccable. I highly recommend the Truffle Risotto."
    },
    {
      id: 2,
      name: "Michael Chen",
      date: "2023-09-28",
      rating: 4,
      comment: "Great atmosphere and delicious food. The Herb-Crusted Salmon was cooked to perfection. Only reason for 4 stars is that we had to wait a bit for our table."
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      date: "2023-10-05",
      rating: 5,
      comment: "The best dining experience I've had in months! Every dish was beautifully presented and tasted incredible. The staff was very attentive and knowledgeable."
    },
    {
      id: 4,
      name: "David Williams",
      date: "2023-09-20",
      rating: 5,
      comment: "Celebrated our anniversary here and couldn't have chosen a better place. The Braised Short Ribs were outstanding and the wine pairing suggestions were spot on."
    },
    {
      id: 5,
      name: "Amanda Taylor",
      date: "2023-10-10",
      rating: 4,
      comment: "Lovely ambiance and great food. The dessert menu is a must-try! Would have given 5 stars but the main course took a while to arrive."
    }
  ];
  
  // Calculate rating stats
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const ratingCounts = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {});
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Render stars for ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500' : 'text-surface-300'}`} 
        fill={i < rating ? 'currentColor' : 'none'} 
      />
    ));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            className="fixed inset-0 bg-black/50" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden w-full max-w-2xl z-10 max-h-[80vh] flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-xl font-bold">Customer Ratings & Reviews</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-4 flex-1">
              <div className="bg-surface-100 dark:bg-surface-700 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold mr-2">{averageRating.toFixed(1)}</span>
                    <div className="flex items-center">{renderStars(Math.round(averageRating))}</div>
                  </div>
                  <div className="text-surface-600 dark:text-surface-400">{totalReviews} reviews</div>
                </div>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center">
                      <div className="w-16 text-sm">{star} stars</div>
                      <div className="w-full h-2 bg-surface-200 dark:bg-surface-600 rounded-full overflow-hidden mx-2">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${((ratingCounts[star] || 0) / totalReviews) * 100}%` }}
                        />
                      </div>
                      <div className="w-8 text-sm text-surface-600 dark:text-surface-400 text-right">
                        {ratingCounts[star] || 0}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.name}</div>
                      <div className="text-sm text-surface-500 dark:text-surface-400">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex mb-2">{renderStars(review.rating)}</div>
                    <p className="text-surface-700 dark:text-surface-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RatingsReviewsModal;