import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const LocationMap = () => {
  // Define icons at the top of component
  const MapPinIcon = getIcon('MapPin');
  const PhoneIcon = getIcon('Phone');
  const ExternalLinkIcon = getIcon('ExternalLink');
  
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  
  // Restaurant location coordinates
  const restaurantLocation = { lat: 40.712776, lng: -74.005974 }; // Example: New York City
  const restaurantAddress = {
    street: "123 Culinary Avenue",
    city: "New York",
    state: "NY",
    zip: "10001",
    neighborhood: "Foodville District"
  };
  
  // Check if Google Maps API is loaded
  const isGoogleMapsLoaded = () => {
    return window.google && window.google.maps;
  };

  useEffect(() => {
    // Function to initialize the map
    const initializeMap = () => {
      if (mapRef.current && isGoogleMapsLoaded()) {
        try {
          const map = new window.google.maps.Map(mapRef.current, {
            center: restaurantLocation,
            zoom: 15,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }]
          });
          
          // Add a marker for the restaurant
          new window.google.maps.Marker({
            position: restaurantLocation,
            map: map,
            title: "DineSync Restaurant",
            animation: window.google.maps.Animation.DROP
          });
          
          setMapLoaded(true);
        } catch (error) {
          console.error("Error initializing Google Maps:", error);
          setMapError(true);
        }
      }
    }
    
    initializeMap();
  }, []);
  
  // Get directions URL
  const getDirectionsUrl = () => {
    const destination = encodeURIComponent(`${restaurantAddress.street}, ${restaurantAddress.city}, ${restaurantAddress.state} ${restaurantAddress.zip}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card p-5 md:col-span-1">
        <h3 className="text-xl font-bold flex items-center mb-4"><MapPinIcon className="w-5 h-5 mr-2 text-accent" /> Our Address</h3>
        <p className="text-surface-700 dark:text-surface-300 mb-2">{restaurantAddress.street}</p>
        <p className="text-surface-700 dark:text-surface-300 mb-4">{restaurantAddress.city}, {restaurantAddress.state} {restaurantAddress.zip}</p>
        <p className="text-surface-500 dark:text-surface-400 text-sm mb-5">{restaurantAddress.neighborhood}</p>
        
        <div className="flex items-center text-surface-600 dark:text-surface-400 mb-6">
          <PhoneIcon className="w-4 h-4 mr-2" /> (555) 123-4567
        </div>
        
        <motion.a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full flex justify-center items-center" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          Get Directions <ExternalLinkIcon className="w-4 h-4 ml-2" />
        </motion.a>
      </div>
      <div className="md:col-span-2 h-80 md:h-96 rounded-xl overflow-hidden shadow-card">
        {mapError ? (
          <div className="w-full h-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center">
            <div className="text-center p-6">
              <MapPinIcon className="w-12 h-12 mx-auto mb-4 text-surface-400" />
              <h3 className="text-lg font-semibold mb-2">Map unavailable</h3>
              <p className="text-surface-500 dark:text-surface-400 max-w-md">
                We're having trouble loading the map. Please check the address details or try again later.
              </p>
            </div>
          </div>
        ) : (
          <div ref={mapRef} id="google-map" style={{ width: '100%', height: '100%' }} 
               className="bg-surface-200 dark:bg-surface-700"></div>
        )}
      </div>
    </div>
  );
};

export default LocationMap;