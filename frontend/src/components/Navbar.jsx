import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      
      {/* App Name */}
      <h1 className="text-lg font-semibold">Food Blog</h1>

      {/* Links */}
      <div className="flex gap-6 items-center text-sm">
        <Link to="/" className="hover:text-green-700">Home</Link>
        <Link to="/myrecipes" className="hover:text-green-700">My Recipe</Link>
        <Link to="/favourites" className="hover:text-green-700">Favourites</Link>

        {/* Login */}
        <button className="bg-green-700 text-white px-3 py-1 rounded">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;