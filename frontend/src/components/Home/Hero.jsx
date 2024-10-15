import React from 'react';
import { Link } from 'react-router-dom';
import IPAddressPopup from '../IPAddressPopup/IPAddressPopup';  // Import the popup component

const Hero = () => {
  return (
    <div className='h-[76vh] flex flex-col md:flex-row items-center justify-center'>
      {/* IP Address Popup */}
      <IPAddressPopup /> 

      <div className='w-full lg:w-3/6 mb-12 md:mb-0 flex flex-col items-center lg:items-start justify-center space-y-12'>
        <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-10 text-center lg:text-left'>
          Discover Your Next Great Read
        </h1>
        <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
          Explore a curated selection of captivating books and uncover your next literary adventure.
          Whether you're into thrilling mysteries, inspiring biographies, or imaginative fiction,
          we have the perfect read waiting for you.
        </p>
        <div className='mt-8'>
          <Link
            to="/all-books"
            className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'
          >
            Discover Books
          </Link>
        </div>
      </div>

      <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
        <img src="./cover.png" alt="cover" />
      </div>
    </div>
  );
};

export default Hero;
