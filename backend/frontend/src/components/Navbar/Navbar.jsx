import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

function Navbar() {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="bg-zinc-800 text-white px-8 py-4 relative z-50 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookZone</h1>
        </Link>

        <div className="nav-links-bookzone block md:flex items-center gap-4">
          <div className="hidden md:flex flex gap-4">
            {links.map((item, i) => (
              <Link
                to={item.link}
                className="hover:text-blue-500 transition-all duration-500"
                key={i}
              >
                {item.title}
              </Link>
            ))}

            {/* Conditionally render Cart if logged in and not an admin */}
            {isLoggedIn && role !== "admin" && (
              <Link
                to="/cart"
                className="hover:text-blue-500 transition-all duration-500"
              >
                Cart
              </Link>
            )}

            {/* Conditionally Render Profile or Admin Profile */}
            {isLoggedIn && (
              <Link
                to="/profile"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                {role === "admin" ? "Admin Profile" : "Profile"}
              </Link>
            )}
          </div>

          {isLoggedIn === false && (
            <div className="hidden md:flex flex gap-4">
              <Link
                to="/LogIn"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignUp
              </Link>
            </div>
          )}

          <button
            className="text-white text-2xl block md:hidden hover:text-zinc-400"
            onClick={() =>
              MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      <div
        className={` ${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className={` ${MobileNav} hover:text-blue-500 text-white text-4xl mb-8 font-semibold transition-all duration-500`}
            key={i}
            onClick={() =>
              MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
            }
          >
            {item.title}
          </Link>
        ))}

        {/* Conditionally render Cart in mobile menu if logged in and not an admin */}
        {isLoggedIn && role !== "admin" && (
          <Link
            to="/cart"
            className={` ${MobileNav} hover:text-blue-500 text-white text-4xl mb-8 font-semibold transition-all duration-500`}
            onClick={() =>
              MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
            }
          >
            Cart
          </Link>
        )}

        {isLoggedIn && (
          <Link
            to="/profile"
            className={` ${MobileNav} px-8 py-2 mb-8 text-3xl font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            onClick={() =>
              MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
            }
          >
            {role === "admin" ? "Admin Profile" : "Profile"}
          </Link>
        )}

        {isLoggedIn === false && (
          <>
            <Link
              to="/LogIn"
              className={` ${MobileNav} px-8 py-2 mb-8 text-3xl font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            >
              Login
            </Link>
            <Link
              to="/SignUp"
              className={` ${MobileNav} px-8 py-2 mb-8 text-3xl font-semibold bg-blue-500 rounded text-white hover:text-zinc-800 transition-all duration-300`}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
