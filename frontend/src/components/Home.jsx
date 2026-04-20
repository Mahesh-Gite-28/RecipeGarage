import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  // Fetch API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/");
        const data = await res.json();
        console.log(data);
        setRecipes(data.recipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="px-10 py-6">

      {/* Hero Section */}
      <div className="flex justify-between items-center mb-10">
        
        {/* Left */}
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            Food Recipe
          </h1>

          <p className="text-gray-600 mb-5">
            Discover delicious recipes and share your own cooking ideas with the world.
          </p>

          <button className="bg-green-700 text-white px-5 py-2 rounded">
            Share your recipe
          </button>
        </div>

        {/* Right Image */}
        <img
          src="/dosa.png"
          alt="food"
          className="w-60 rounded-full"
        />
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>

    </div>
  );
};

export default Home;