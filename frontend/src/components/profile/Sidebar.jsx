import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  
  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    navigate("/");
  };

  return (
    <>
      {/* Desktop Sidebar - visible on md and above */}
      <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-full hidden md:flex'>
        {/* User Info Section */}
        <div className='flex flex-col items-center justify-center'>
          <img
            src={data.avatar}
            alt="User Avatar"
            className='h-[12vh] w-[12vh] object-cover rounded-full'
          />
          <p className='mt-3 text-xl text-zinc-100 font-semibold'>{data.username}</p>
          <p className='mt-1 text-sm text-zinc-300'>{data.email}</p>

          {/* Divider */}
          <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
        </div>

        {/* Navigation Links */}
        {role === "user" && (
          <div className='w-full flex flex-col items-center justify-center'>
            <Link
              to="/profile"
              className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
              Favourites
            </Link>
            <Link
              to="/profile/orderHistory"
              className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
              Order History
            </Link>
            <Link
              to="/profile/settings"
              className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
              Settings
            </Link>
          </div>
        )}
        
        {role === "admin" && (
          <div className='w-full flex flex-col items-center justify-center'>
            <Link
              to="/profile"
              className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
              All Orders
            </Link>
            <Link
              to="/profile/add-book"
              className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
              Add Books
            </Link>
          </div>
        )}

        {/* Logout Button */}
        <button
          className='bg-zinc-900 w-3/6 lg:w-full mt-4 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300'
          onClick={handleLogout}
        >
          Log Out
          <FaArrowRightFromBracket className="ml-2" />
        </button>
      </div>

      {/* Mobile Sidebar - visible on small screens */}
      <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-full flex md:hidden'>
        {/* User Info Section */}
        <div className='flex flex-col items-center justify-center'>
          <img
            src={data.avatar}
            alt="User Avatar"
            className='h-[10vh] w-[10vh] object-cover rounded-full'
          />
          <p className='mt-3 text-lg text-zinc-100 font-semibold'>{data.username}</p>
          <p className='mt-1 text-sm text-zinc-300'>{data.email}</p>

          {/* Divider */}
          <div className='w-full mt-4 h-[1px] bg-zinc-500'></div>
        </div>

        {/* Navigation Links */}
        <div className='w-full flex flex-col items-center justify-center'>
          <Link
            to="/profile"
            className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
          >
            Settings
          </Link>
        </div>

        {/* Logout Button */}
        <button
          className='bg-zinc-900 w-3/6 mt-4 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300'
          onClick={handleLogout}
        >
          Log Out
          <FaArrowRightFromBracket className="ml-2" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
