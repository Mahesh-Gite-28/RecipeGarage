import React, { useEffect, useState, useContext } from "react";
import RecipeCard from "./RecipeCard";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const Favrecipe = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchFavRecipes = async () => {
      try {
        const res = await fetch(`${API_BASE}/favRecipe`, {
          credentials: "include",
        });
        const data = await res.json();
        setRecipes(data.recipes || []);
      } catch (err) {
        console.error("Error fetching fav recipes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavRecipes();
  }, [user]);

  useEffect(() => {
    if (user?.favourites) {
      setRecipes((prev) => prev.filter((r) => user.favourites.includes(r._id)));
    }
  }, [user?.favourites]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to see and manage your favourite recipe collection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          Favourite Recipes <span className="text-red-500">❤️</span>
        </h1>
        <div className="bg-red-100 text-red-800 px-4 py-1 rounded-full font-semibold">
          {recipes.length} {recipes.length === 1 ? 'Saved' : 'Saved'}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading your favourites...</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="text-5xl mb-4">🍲</div>
          <p className="text-xl text-gray-500 font-medium mb-4">No favourite recipes yet.</p>
          <p className="text-gray-400">Browse the latest recipes and heart the ones you love!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favrecipe;