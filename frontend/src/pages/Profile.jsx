import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/profile/Sidebar";
import MobileNav from "../components/profile/MobileNav";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  const [Profile, setProfile] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `https://try-web-pbcm.onrender.com`,
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row gap-4 h-screen py-8 text-white">
      {/* Loader while waiting for profile data */}
      {!Profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Display profile once data is loaded */}
      {Profile && (
        <>
          {/* Sidebar for desktop only */}
          <div className="hidden md:block w-full md:w-1/6">
            <Sidebar data={Profile} />
          </div>

          {/* MobileNav for mobile only */}
          <div className="block md:hidden w-full">
            <MobileNav data={Profile} />
          </div>

          {/* Main content area with overflow handling */}
          <div className="w-full md:w-5/6 overflow-auto">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
