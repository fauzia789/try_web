import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaCartArrowDown, FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBooksDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState();
  const [loading, setLoading] = useState(true);

  // Fetching isLoggedIn and role from Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${window.location.origin}/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching the book details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);
  const headers = {
    id : localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  
   };
const handleFavourite = async () =>{
  const response = await axios
  .put(`${window.location.origin}/api/v1/add-book-favourite`, {}, {headers}

  );
  alert(response.data.message);
}
const handleCart = async () =>{
  const response = await axios.put(`${window.location.origin}/api/v1/add-to-cart` , {},
     {headers} );
     alert(response.data.message);
}

  if (loading) {
    return <Loader />;
  }
const handleDelete= async() =>{
  const response=await axios.delete(`${window.location.origin}:1000/api/v1/delete-book`,
    {headers}
  );
  alert(response.data.message);
  navigate("/all-books");
};
  return (
    <>
      {Data && (
        <div className="px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row lg:gap-8 lg:justify-between items-center">
          {/* Book Image */}
          <div className="bg-zinc-800 rounded p-6 flex-1 flex flex-col items-center justify-center lg:w-1/2 w-full gap-6">
            {Data?.url ? (
              <img
                className="h-[60vh] object-contain w-full rounded-lg"
                src={Data.url}
                alt="Book Cover"
              />
            ) : (
              <p className="text-white">No image available</p>
            )}

            {/* Favorite & Cart Buttons */}
            {isLoggedIn && role === "user" && (
              <div className="flex space-x-4 mt-6">
                <button className="flex items-center bg-white rounded-full p-4 shadow-md hover:bg-gray-200 transition ease-in-out duration-300" 
                onClick={handleFavourite}>
                  <FaHeart className="text-red-500 text-2xl mr-2" />
                  <span className="text-lg font-medium text-gray-700">Add to Favorites</span>
                </button>
                <button className="flex items-center bg-white rounded-full p-4 shadow-md hover:bg-gray-200 transition ease-in-out duration-300"   onClick={handleCart}>
                  <FaCartArrowDown className="text-green-500 text-2xl mr-2" />
                  <span className="text-lg font-medium text-gray-700">Add to Cart</span>
                </button>
              </div>
            )}

            {/* Edit & Delete Buttons for Admin */}
            {isLoggedIn && role === "admin" && (
              <div className="flex space-x-4 mt-6">
              <Link to={`/updateBook/${id}`} className="flex items-center bg-white rounded-full p-4 shadow-md hover:bg-gray-200 transition ease-in-out duration-300">
  <FaEdit className="text-blue-500 text-2xl mr-2" />
  <span className="text-lg font-medium text-gray-700">Edit Book</span>
</Link>

                <button className="flex items-center bg-white rounded-full p-4 shadow-md hover:bg-gray-200 transition ease-in-out duration-300"  onClick={handleDelete}>
                  <MdOutlineDelete className="text-red-500 text-2xl mr-2" />
                  <span className="text-lg font-medium text-gray-700">Delete Book</span>
                </button>
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="p-6 text-white flex-1 lg:w-1/2 w-full">
            <h2 className="text-4xl font-bold mb-4">
              {Data?.title || "No title available"}
            </h2>
            <p className="text-lg mb-4">
              <span className="font-semibold">Author:</span> {Data?.author || "Unknown"}
            </p>
            <p className="text-lg mb-4">
              <span className="font-semibold">Description:</span>{" "}
              {Data?.desc || "No description available"}
            </p>
            <p className="text-lg mb-4">
              <span className="font-semibold">Price:</span>{" "}
              {Data?.price ? `$${Data.price}` : "Price not available"}
            </p>
            <p className="text-lg flex items-center">
              <GrLanguage className="mr-2 text-xl" />
              <span>{Data?.language || "Not specified"}</span>
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBooksDetails;
