import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const IPAddressPopup = () => {
  const [country, setCountry] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        // Fetch country information using the IP
        const response = await axios.get('http://ip-api.com/json/');
        const { country } = response.data;
        console.log('Fetched country:', country); // Debug log
        setCountry(country);

        // Check if the popup was already shown
        const popupShown = Cookies.get('popupShown');
        console.log('Popup shown cookie:', popupShown); // Check current value

        if (!popupShown) {
          // Show the popup if not shown before
          setShowPopup(true);
          Cookies.set('popupShown', true, { expires: 1, path: '/' }); // Set cookie with path
          console.log('Popup shown cookie set'); // Confirm setting
        }
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };

    fetchCountry(); // Fetch the user's country when the component mounts
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-8 rounded-lg text-center'>
            <p className='text-xl font-semibold mb-4'>
              Welcome! It seems you're visiting from {country}. 
              Enjoy exploring our content tailored for readers from all over the world!
            </p>
            <button 
              onClick={closePopup} 
              className='text-white bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600'>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IPAddressPopup;
