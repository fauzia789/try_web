import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id : localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  bookid: data._id,
   };
   const handleRemoveBook = async()=>{
    const response =await axios.put(
      `https://try-web-pbcm.onrender.com`,
      {},{headers}
    );
    alert(response.data.message);
   };
  return (
    <div className="bg-zinc-800 rounded-lg p-4 flex flex-col items-center justify-between transition-transform transform hover:scale-105 hover:shadow-lg ease-in-out duration-300 w-full">
      <Link to={`/view-book-details/${data._id}`} className="no-underline w-full">
        {/* Book Image */}
        <div className="bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center w-full h-[35vh] md:h-[40vh] lg:h-[45vh]">
          <img
            src={data.url}
            alt={data.title}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Book Details */}
        <div className="mt-3 text-center">
          <h3 className="text-white text-lg font-semibold truncate">
            {data.title}
          </h3>
          <p className="text-gray-400 mt-1 truncate">{data.author}</p>
          <p className="text-yellow-400 text-xl font-bold mt-2">
            ${data.price}
          </p>
        </div>
      </Link>

      {/* Remove from Favourites Button (Inside the Card after Price) */}
      {favourite && (
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-lg mt-4 transition-all hover:bg-red-600 shadow-lg w-full"
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
