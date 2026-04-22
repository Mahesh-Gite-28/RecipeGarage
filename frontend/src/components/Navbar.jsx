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
      <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
        
        {/* App Name */}
        <h1 className="text-lg font-semibold">
          <Link to="/">Food Blog</Link>
        </h1>

        {/* Links */}
        <div className="flex gap-6 items-center text-sm">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <Link to="/myrecipes" className="hover:text-green-700">My Recipe</Link>
          <Link to="/favourites" className="hover:text-green-700">Favourites</Link>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600 italic font-medium">@{user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Popup */}
      <AuthModal show={showAuth} setShow={setShowAuth} />
    </>
  );
};

export default Navbar;