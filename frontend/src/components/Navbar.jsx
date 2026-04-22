import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [showAuth, setShowAuth] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">

        {/* LEFT: LOGO + BRAND */}
        <Link to="/" className="flex items-center gap-3">
          
          {/* Logo */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-100 shadow-sm bg-white p-1">
            <img
              src="/brand.png"
              alt="RecipeGarage Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Brand Name */}
          <h1 className="text-xl font-bold text-gray-800">
            Recipe<span className="text-green-700">Garage</span>
          </h1>
        </Link>

        {/* RIGHT: NAV LINKS */}
        <div className="flex gap-6 items-center text-sm font-medium">

          <Link to="/" className="hover:text-green-700 transition">
            Home
          </Link>

          <Link to="/myrecipes" className="hover:text-green-700 transition">
            My Recipes
          </Link>

          <Link to="/favourites" className="hover:text-green-700 transition">
            Favourites
          </Link>

          {/* AUTH SECTION */}
          {user ? (
            <div className="flex items-center gap-4 ml-4">

              <span className="text-gray-600 italic">
                @{user.username}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-1.5 rounded-md 
                           hover:bg-red-700 transition font-semibold shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="bg-green-700 text-white px-4 py-1.5 rounded-md 
                         hover:bg-green-800 transition shadow-sm"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* AUTH MODAL */}
      <AuthModal show={showAuth} setShow={setShowAuth} />
    </>
  );
};

export default Navbar;