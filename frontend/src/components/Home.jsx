import React, { useEffect, useState, useContext } from "react";
import RecipeCard from "./RecipeCard";
import AddRecipeModal from "./AddRecipeModal";
import LandingPage from "./LandingPage";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/`);
      const data = await res.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="px-6 md:px-10 py-6 relative overflow-hidden">

      {/* HERO SECTION */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 mb-14">

        {/* LEFT CONTENT */}
        <div className="max-w-xl text-center md:text-left z-10">
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Cook. Share. <span className="text-green-700">Discover.</span>
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Explore delicious recipes from around the world and share your own creations with a growing community of food lovers.
          </p>

          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-green-700 text-white px-7 py-3 rounded-full font-semibold 
                       hover:bg-green-800 transition duration-300 
                       shadow-lg hover:shadow-xl hover:scale-105"
          >
            Share your recipe
          </button>
        </div>

        

        {/* BACKGROUND BLUR EFFECTS */}
        
      </div>

      <hr className="mb-10 border-gray-200" />

      {/* RECIPES SECTION */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Latest Recipes
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">
            Fetching delicious recipes...
          </p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-xl text-gray-500 font-medium mb-4">
            No recipes found 🍲
          </p>

          <button 
            onClick={() => setShowAddModal(true)}
            className="text-green-700 font-bold hover:underline"
          >
            Be the first to share one!
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}

      {/* ADD RECIPE MODAL */}
      <AddRecipeModal 
        show={showAddModal} 
        setShow={setShowAddModal} 
        onRecipeAdded={fetchRecipes}
      />

    </div>
  );
};

export default Home;