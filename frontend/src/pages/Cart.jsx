import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${window.location.origin}/api/v1/get-user-cart`, { headers });
      setCart(response.data.data || []);
      calculateTotal(response.data.data || []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError("Failed to fetch cart data.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotal(totalPrice);
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(`${window.location.origin}/api/v1/remove-from-cart/${bookid}`, null, { headers });
      alert(response.data.message);
      await fetchCartData();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(`${window.location.origin}/api/v1/place-order`, { order: cart }, { headers });
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 flex-grow">
        {loading && (
          <div className="flex items-center justify-center min-h-screen">
            <Loader />
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}
        {cart.length === 0 && !loading && !error && (
          <div className="h-screen flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-zinc-500 mb-4">Empty Cart</h2>
            <img src="./cart.png" alt="Empty cart" className="lg:h-[50vh] h-[30vh]" />
          </div>
        )}
        {cart.length > 0 && (
          <>
            <h1 className="text-4xl md:text-5xl font-semibold text-zinc-500 mb-8">Your Cart</h1>
            <div className="overflow-auto max-h-[50vh]"> {/* This limits the height for cart items */}
              {cart.map((item, i) => (
                <div
                  className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
                  key={i}
                >
                  <img
                    src={item.url}
                    alt="Product"
                    className="h-[20vh] md:h-[15vh] w-auto md:w-1/6 object-cover"
                  />
                  <div className="w-full md:w-auto mt-4 md:mt-0 text-center md:text-left">
                    <h1 className="text-2xl text-zinc-100 font-semibold">{item.title}</h1>
                    <p className="text-normal text-zinc-300 mt-2 hidden lg:block">{item.desc.slice(0, 100)}...</p>
                  </div>
                  <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                    <h2 className="text-zinc-100 font-semibold text-2xl md:text-3xl">${parseFloat(item.price).toFixed(2)}</h2>
                    <button
                      className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ml-4 md:ml-12"
                      onClick={() => deleteItem(item._id)}
                    >
                      <MdOutlineDeleteForever size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and Place Order Section */}
            <div className="mt-8 flex justify-center md:justify-end">
              <div className="bg-zinc-800 p-4 rounded w-full md:w-1/2 lg:w-1/3">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-500">Total Amount</h2>
                <div className="flex justify-between mt-4">
                  <span className="text-zinc-300">Number of Books: {cart.length}</span>
                  <span className="text-zinc-300">Total Price: ${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="mt-6 bg-green-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg shadow hover:bg-green-700 transition w-full"
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        )}
      </div>
     
    </div>
  );
};

export default Cart;
