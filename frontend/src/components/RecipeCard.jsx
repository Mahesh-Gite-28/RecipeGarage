import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const RecipeCard = ({ recipe, manageable = false }) => {
  const navigate = useNavigate();
  const { user, updateFavourites } = useContext(AuthContext);

  const isFav = user?.favourites?.includes(recipe._id) ?? false;

  const toggleFav = async (e) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to add to favourites");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/${recipe._id}/favourite`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        updateFavourites(data.favourites);
      }
    } catch (err) {
      console.error("Error toggling favourite", err);
    }
  };

  const handleClick = () => {
    if (manageable) {
      navigate(`/recipe/${recipe._id}?manage=true`);
    } else {
      navigate(`/recipe/${recipe._id}`);
    }
  };

  return (
    <div 
      onClick={handleClick} 
      className="bg-white shadow-lg rounded-xl overflow-hidden w-full hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.coverImage || "/no.png"}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button 
          onClick={toggleFav}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="p-4 bg-white">
        <h2 className="font-bold text-xl text-gray-800 mb-1 truncate">{recipe.title}</h2>
        
        {recipe.createdBy && (
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
            By {recipe.createdBy.username || "Anonymous"}
          </p>
        )}

        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="flex items-center gap-1 text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded">
            ⏱ {recipe.time || "N/A"}
          </span>
          <span className="text-green-700 font-bold group-hover:underline">View Details →</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;