import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistore = () => {
  const [OrderHistory, setOrderHistory] = useState(null); // Initialize as null
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://try-web-pbcm.onrender.com`, { headers });
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
      <h1 className="text-3xl font-semibold text-zinc-700 mb-4">Your Order History</h1>

      {OrderHistory === null && <Loader />} {/* Loader for fetching data */}
      
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-zinc-500">
          <h1 className='text-5xl font-semibold mb-8 text-center'>No Order History</h1>
          <img src="https://icons.veryicon.com/png/o/miscellaneous/template-3/no-order.png" alt="No Orders" className='h-32 mb-8 lg:h-[100%]' />
        </div>
      )}
      
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="w-full bg-white shadow-lg rounded-lg p-4">
          {/* Header Row */}
          <div className="bg-zinc-800 text-yellow-300 rounded-t-lg p-2 grid grid-cols-5 md:grid-cols-6 gap-4">
            <div className="text-center">Sr.</div>
            <div className="text-center">Books</div>
            <div className="text-center  hidden md:block">Description</div>
            <div className="text-center">Price</div>
            <div className="text-center">Status</div>
            <div className="text-center hidden md:block">Mode</div>
          </div>
          
          {/* Order History Rows */}
          {OrderHistory.map((items, index) => (
            <div 
              key={index} 
              className="grid grid-cols-5 md:grid-cols-6 gap-4 bg-zinc-200 p-2 my-2 hover:bg-zinc-300 transition-all text-blue-500 rounded"
            >
              <div className="text-center">{index + 1}</div>
              <div className="text-center">
                <Link to={`/view-book-details/${items.book._id}`} className="hover:text-blue-600">
                  {items.book.title}
                </Link>
              </div>
              <div className="truncate text-center">
                {items.book.desc.slice(0, 50)}...
              </div>
              <div className="text-center">${items.book.price}</div>
              <div className="text-center">
                <h1 className={`font-semibold ${items.status === "Order placed" ? "text-yellow-500" : items.status === "Canceled" ? "text-red-500" : "text-green-500"}`}>
                  {items.status}
                </h1>
              </div>
              <div className="text-center hidden md:block text-zinc-400">COD</div> {/* Hidden on mobile, visible on larger screens */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistore;
