import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const MobileNav = ({ data }) => {
  const location = useLocation(); // To highlight active link based on route
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role); // Get role from Redux store

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-between w-full my-4">
      {/* User Info Section */}
      <div className='flex flex-col items-center justify-center mb-4'>
        <img
          src={data.avatar}
          alt="User Avatar"
          className='h-[10vh] w-[10vh] object-cover rounded-full'
        />
        <p className='mt-2 text-lg text-zinc-100 font-semibold'>{data.username}</p>
        <p className='mt-1 text-sm text-zinc-300'>{data.email}</p>
      </div>

      {/* Navigation Links for Mobile View */}
      {role === "user" && (
        <div className="flex gap-2 w-full justify-center">
          <Link
            to="/profile"
            className={`text-zinc-100 font-semibold py-1 px-2 rounded transition-all duration-300 ${
              location.pathname === '/profile' ? 'bg-zinc-700' : 'hover:bg-zinc-900'
            }`}
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className={`text-zinc-100 font-semibold py-1 px-2 rounded transition-all duration-300 ${
              location.pathname === '/profile/orderHistory' ? 'bg-zinc-700' : 'hover:bg-zinc-900'
            }`}
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className={`text-zinc-100 font-semibold py-1 px-2 rounded transition-all duration-300 ${
              location.pathname === '/profile/settings' ? 'bg-zinc-700' : 'hover:bg-zinc-900'
            }`}
          >
            Settings
          </Link>
        </div>
      )}
      
      {role === "admin" && (
        <div className="flex gap-2 w-full justify-center">
          <Link
            to="/profile"
            className={`text-zinc-100 font-semibold py-1 px-2 rounded transition-all duration-300 ${
              location.pathname === '/profile' ? 'bg-zinc-700' : 'hover:bg-zinc-900'
            }`}
          >
           All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className={`text-zinc-100 font-semibold py-1 px-2 rounded transition-all duration-300 ${
              location.pathname === '/profile/orderHistory' ? 'bg-zinc-700' : 'hover:bg-zinc-900'
            }`}
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
  );
};

export default MobileNav;
