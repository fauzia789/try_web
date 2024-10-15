import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { FaUser, FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from './SeeUserData';

const AllOrders = () => {
  const [Allorders, setAllOrders] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);
  
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    id: localStorage.getItem("id"),
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://try-web-pbcm.onrender.com`, { headers });
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...Allorders];
    updatedOrders[index].status = newStatus;
    setAllOrders(updatedOrders);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleConfirmStatus = () => {
    setEditingIndex(null);
  };

  const handleUserInfoClick = (userId, userData) => {
    setUserDiv("fixed");
    setUserDivData(userData);
  };

  return (
    <>
      {!Allorders && (
        <div className='h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {Allorders && Allorders.length > 0 && (
        <div className='h-[100%] p-0 md:p-6 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-6 text-center'>All Orders</h1>
          <div className="bg-zinc-800 text-yellow-300 rounded p-4 grid grid-cols-4 md:grid-cols-6 gap-4 items-center text-sm md:text-base">
            <div className="text-center font-bold">Sr.</div>
            <div className="text-center font-bold">Books</div>
            <div className="text-center hidden md:block font-bold">Description</div>
            <div className="text-center font-bold">Price</div>
            <div className="text-center font-bold">Status</div>
            <div className="text-center flex justify-center"><FaUser /></div>
          </div>
          {Allorders.map((items, i) => (
            <div key={i} className="bg-zinc-700 hover:bg-zinc-600 text-white p-3 grid grid-cols-4 md:grid-cols-6 gap-4 my-2 items-center text-xs md:text-sm rounded-lg transition duration-300">
              <div className="text-center">{i + 1}</div>
              <div className="text-center font-medium">{items.book.title}</div>
              <div className="text-center hidden md:block text-gray-400">
                {items.book.desc ? items.book.desc.substring(0, 50) + '...' : 'No description available'}
              </div>
              <div className="text-center font-semibold">${items.book.price}</div>
              <div className="text-center">
                {editingIndex === i ? (
                  <>
                    <select 
                      name="status" 
                      className="bg-gray-800 text-white mt-2 p-1 rounded"
                      onChange={(e) => handleStatusChange(i, e.target.value)} 
                      value={items.status}
                    >
                      <option value="Order placed">Order placed</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                    <button className="text-green-500 hover:text-pink-600 mx-2" onClick={handleConfirmStatus}>
                      <FaCheck />
                    </button>
                  </>
                ) : (
                  <div 
                    className={`cursor-pointer ${items.status === "Order placed" ? "text-yellow-500" : 
                      items.status === "Canceled" ? "text-red-500" : "text-green-500"}`}
                    onClick={() => handleEditClick(i)}
                  >
                    {items.status}
                  </div>
                )}
              </div>
              <div className="text-center hidden md:block">
                {items.user.name}
                <div className="flex justify-center items-center">
                  <button
                    className="flex items-center text-gray-400 hover:text-gray-200"
                    onClick={() => handleUserInfoClick(items.user._id, items.user)}
                  >
                    <IoOpenOutline className="text-xl mx-1" />
                    <span className="text-sm">{items.user.ordersCount} orders</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
