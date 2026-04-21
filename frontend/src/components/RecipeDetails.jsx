import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/${id}`);
        const data = await res.json();

        console.log(data);
        setRecipe(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <h2 className="p-10">Loading...</h2>;

  return (
    <div className="p-10 max-w-3xl mx-auto">

      {/* Image */}
      <img
        src="/dosa.png"
        alt="recipe"
        className="w-full h-64 object-cover rounded"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mt-5">{recipe.title}</h1>

      {/* Time */}
      <p className="text-gray-600 mt-2">⏱ {recipe.time}</p>

      {/* Ingredients */}
      <div className="mt-5">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <p className="text-gray-700 mt-2">{recipe.ingredients}</p>
      </div>

      {/* Instructions */}
      <div className="mt-5">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <p className="text-gray-700 mt-2">{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;