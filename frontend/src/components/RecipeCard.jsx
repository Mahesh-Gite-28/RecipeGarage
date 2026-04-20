import React from "react";


const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-60 hover:scale-105 transition">
      
      {/* Image (dummy for now) */}
      <img
        src="/dosa.png"
        alt="recipe"
        className="w-full h-36 object-cover"
      />

      {/* Content */}
      <div className="bg-green-100 p-3">
        <h2 className="font-semibold text-gray-800">{recipe.title}</h2>

        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
          <span>⏱ {recipe.time}</span>
          <span>❤️</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;