import React from "react";
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setUserDiv }) => {
  return (
    <div className={`${userDiv} fixed top-0 left-0 h-screen w-full bg-zinc-800 opacity-80 flex items-center justify-center`}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[60%] lg:w-[40%] text-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">User Information</h1>
          <button onClick={() => setUserDiv("hidden")} className="text-zinc-600 hover:text-red-500 transition">
            <RxCross1 size={24} />
          </button>
        </div>
        <div className="mt-2">
          <label>
            Username: 
            <span className="font-semibold"> {userDivData.username}</span>
          </label>
        </div>
        <div className="mt-4">
          <label>
            Email: 
            <span className="font-semibold"> {userDivData.email}</span>
          </label>
        </div>
        <div className="mt-4">
          <label>
            Address: 
            <span className="font-semibold"> {userDivData.address}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SeeUserData;
