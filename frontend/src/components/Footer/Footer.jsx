import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaGoogle } from 'react-icons/fa';
import Cookies from 'js-cookie';

const Footer = () => {
  // Visitor Counter
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Check if the cookie for visitor count exists
    const storedCount = Cookies.get('visitorCount');
    if (storedCount) {
      // Increment the count if cookie exists
      const updatedCount = parseInt(storedCount, 10) + 1;
      setVisitorCount(updatedCount);
      Cookies.set('visitorCount', updatedCount, { expires: 7 }); // Cookie will expire in 7 days
    } else {
      // Initialize the cookie if it doesn't exist
      Cookies.set('visitorCount', 1, { expires: 7 });
      setVisitorCount(1);
    }
  }, []);

  return (
    <footer className="bg-zinc-800 text-white px-10 py-12 space-y-10">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row justify-between space-x-5 items-start space-y-8 md:space-y-0">
        
        {/* Company Info */}
        <div className="md:w-1/3">
          <h1 className="text-3xl font-bold text-blue-400">BookZone</h1>
          <p className="mt-4 text-gray-300">
            At <span className="text-blue-400">BookZone</span>, we organize knowledge elegantly, making information accessible and enriching lives.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="md:w-1/3 flex flex-col space-y-4 items-start">
          <h2 className="text-2xl font-semibold text-blue-100">Follow Us</h2>
          <div className="flex flex-col space-y-2">
            {[
              { icon: FaFacebook, name: 'Facebook', link: 'https://facebook.com' },
              { icon: FaInstagram, name: 'Instagram', link: 'https://instagram.com' },
              { icon: FaTwitter, name: 'X', link: 'https://twitter.com' },
              { icon: FaGithub, name: 'GitHub', link: 'https://github.com' },
              { icon: FaGoogle, name: 'Google', link: 'https://google.com' }
            ].map(({ icon: Icon, name, link }, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-400 hover:text-white transition duration-300">
                <Icon />
                <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">{name}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="md:w-1/3 flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-10">
          {/* Solutions */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-100">Solutions</h2>
            <ul className="mt-4 space-y-2">
              <li><a href="#marketing" className="text-gray-400 hover:text-white hover:underline">Marketing</a></li>
              <li><a href="#analytics" className="text-gray-400 hover:text-white hover:underline">Analytics</a></li>
              <li><a href="#commerce" className="text-gray-400 hover:text-white hover:underline">Commerce</a></li>
              <li><a href="#insights" className="text-gray-400 hover:text-white hover:underline">Insights</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-100">Support</h2>
            <ul className="mt-4 space-y-2">
              <li><a href="#pricing" className="text-gray-400 hover:text-white hover:underline">Pricing</a></li>
              <li><a href="#docs" className="text-gray-400 hover:text-white hover:underline">Documentation</a></li>
              <li><a href="#guides" className="text-gray-400 hover:text-white hover:underline">Guides</a></li>
              <li><a href="#api-status" className="text-gray-400 hover:text-white hover:underline">API Status</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Information and Visitor Counter */}
      <div className="text-center space-y-4 border-t border-gray-600 pt-6">
        <p>&copy; 2024 <span className="text-blue-400">BookZone</span>. All rights reserved.</p>
        <p>
          <a href="#privacy" className="text-gray-400 hover:text-white hover:underline">Privacy Policy</a> | 
          <a href="#terms" className="text-gray-400 hover:text-white hover:underline ml-2">Terms of Service</a>
        </p>
        <p className="text-gray-400">Visitor Count: <span className="text-blue-400 font-semibold">{visitorCount}</span></p>
      </div>
    </footer>
  );
};

export default Footer;
