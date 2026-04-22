import React, { useEffect, useState, useContext, useCallback } from "react";
import RecipeCard from "./RecipeCard";
import AddRecipeModal from "./AddRecipeModal";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const Myrecipe = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchMyRecipes = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/myRecipe`, {
        credentials: "include",
      });
      const data = await res.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error("Error fetching my recipes", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMyRecipes();
  }, [fetchMyRecipes]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please login to see your recipes and share your culinary creations with the world.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Recipes</h1>
        <div className="flex items-center gap-3">
          <div className="bg-green-100 text-green-800 px-4 py-1 rounded-full font-semibold">
            {recipes.length} {recipes.length === 1 ? 'Recipe' : 'Recipes'}
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-800 transition shadow-md"
          >
            + Share Recipe
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading your collection...</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="text-5xl mb-4">🍳</div>
          <p className="text-xl text-gray-500 font-medium mb-4">You haven't shared any recipes yet.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-800 transition"
          >
            Share your first recipe!
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}

      <AddRecipeModal
        show={showAddModal}
        setShow={setShowAddModal}
        onRecipeAdded={fetchMyRecipes}
      />
    </div>
  );
};

export default Myrecipe;
