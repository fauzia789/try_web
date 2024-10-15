import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Settings = () => {
  const [Value, setValue] = useState({ address: "" }); // Initialize address state
  const [ProfileData, setProfileData] = useState(null); // Profile data state

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
const change = (e)=>{
  const {name , value } = e.target;
  setValue({...value, [name]:value});
};
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "${window.location.origin}/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetch();
  }, []);

  const handleUpdate = async() => {
  const response = await axios.put(`${window.location.origin}/api/v1/update-address`,Value,
    {headers}
  );
  alert(response.data.message);
  };

  return (
    <>
      {!ProfileData && (
        <div className="flex justify-center items-center min-h-screen">
          <Loader /> {/* Centered loader */}
        </div>
      )}
      {ProfileData && (
        <div className="h-full p-4 md:p-8 text-zinc-700">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>

          <div className="flex flex-col gap-12">
            {/* Username and Email Section (flex for larger screens, stacked for small screens) */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              {/* Username */}
              <div className="flex-1">
                <label htmlFor="username" className="font-semibold text-zinc-700">
                  Username
                </label>
                <p className="p-2 rounded bg-zinc-200 mt-2 font-semibold text-zinc-800">
                  {ProfileData.username}
                </p>
              </div>

              {/* Email */}
              <div className="flex-1">
                <label htmlFor="email" className="font-semibold text-zinc-700">
                  Email
                </label>
                <p className="p-2 rounded bg-zinc-200 mt-2 font-semibold text-zinc-800">
                  {ProfileData.email}
                </p>
              </div>
            </div>

            {/* Address Section */}
            <div className="flex flex-col">
              <label htmlFor="address" className="font-semibold text-zinc-700">
                Address
              </label>
              <textarea
                className="p-3 mt-2 rounded bg-zinc-200 text-zinc-800 resize-none"
                rows="4"
                value={Value.address}
                onChange={change}
              />
            </div>

            {/* Update Button */}
            <div className="mt-4 flex justify-end">
              <button
                className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
