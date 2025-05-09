import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  // Define icon at the top of component
  const HomeIcon = getIcon('Home');
  const AlertCircleIcon = getIcon('AlertCircle');

  return (
    <motion.div 
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 md:p-6 bg-red-50 dark:bg-red-900/20 rounded-full mb-6">
        <AlertCircleIcon className="w-16 h-16 md:w-24 md:h-24 text-red-500 dark:text-red-400" />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-surface-600 dark:text-surface-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link 
          to="/" 
          className="btn btn-primary inline-flex items-center"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </motion.div>

      <div className="mt-12">
        <img 
          src="https://images.unsplash.com/photo-1594041680838-ba859df82072" 
          alt="Empty plate" 
          className="w-full max-w-md rounded-xl mx-auto opacity-80"
        />
      </div>
    </motion.div>
  );
};

export default NotFound;