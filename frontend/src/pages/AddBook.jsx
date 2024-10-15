import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    ISBN: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    id: localStorage.getItem("id"),
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submit = async () => {
    try {
      // Check if any field is empty
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.ISBN === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          `${window.location.origin}/api/v1/add-book`,
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          ISBN: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="h-[100%] p-8 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        {/* Input fields */}
        <div>
          <label htmlFor="url" className="text-zinc-400">
            Image URL
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="URL of image"
            name="url"
            value={Data.url}
            onChange={change}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="title" className="text-zinc-400">
            Title of Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Title of book"
            name="title"
            value={Data.title}
            onChange={change}
            required
          />
        </div>
        
        <div className="mt-4 flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="author" className="text-zinc-400">
              Author of Book
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Author of book"
              name="author"
              value={Data.author}
              onChange={change}
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label htmlFor="ISBN" className="text-zinc-400">
              ISBN
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="ISBN"
              name="ISBN"
              value={Data.ISBN}
              onChange={change}
              required
            />
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="price" className="text-zinc-400">
              Price
            </label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Price"
              name="price"
              value={Data.price}
              onChange={change}
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label htmlFor="language" className="text-zinc-400">
              Language
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Language"
              name="language"
              value={Data.language}
              onChange={change}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="desc" className="text-zinc-400">
            Description of Book
          </label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            rows="5"
            placeholder="Description of book"
            name="desc"
            value={Data.desc}
            onChange={change}
            required
          ></textarea>
        </div>

        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
