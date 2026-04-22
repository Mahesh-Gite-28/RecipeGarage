import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({ title: "", ingredients: "", instructions: "", time: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  const isManagePage = new URLSearchParams(location.search).get("manage") === "true";

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API_BASE}/${id}/delete`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setShowDeleteModal(false);
        navigate("/my-recipes");
      } else {
        alert("Failed to delete recipe");
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleEditOpen = () => {
    setEditForm({
      title: recipe.title || "",
      ingredients: recipe.ingredients || "",
      instructions: recipe.instructions || "",
      time: recipe.time || ""
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    try {
      const res = await fetch(`${API_BASE}/${id}/edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (res.ok) {
        setRecipe(data);
        setShowEditModal(false);
      } else {
        setEditError(data.message || "Update failed");
      }
    } catch (err) {
      setEditError("Something went wrong");
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading recipe details...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-500">Recipe not found</h2>
        <button 
          onClick={() => navigate("/")}
          className="mt-4 text-green-700 hover:underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  const ingredientsList = recipe.ingredients
    ? recipe.ingredients.split(/[,\n]/).filter(i => i.trim() !== "")
    : [];

  const isOwner = user && recipe.createdBy && (user.id === recipe.createdBy._id || user.id === recipe.createdBy);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Image Section */}
        <div className="relative h-64 md:h-96">
          <img
            src={recipe.coverImage || "/no.png"}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{recipe.title}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <span className="flex items-center gap-1 font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                  ⏱ {recipe.time || "N/A"}
                </span>
                {recipe.createdBy && (
                  <span className="font-medium italic">
                    By {recipe.createdBy.username || "Anonymous"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Ingredients Column */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                🥗 Ingredients
              </h2>
              <ul className="space-y-3">
                {ingredientsList.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions Column */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                🍳 Instructions
              </h2>
              <div className="prose prose-green max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                {recipe.instructions}
              </div>
            </div>
          </div>

          {/* Actions Section */}
          {isOwner && isManagePage && (
            <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4">
              <button 
                onClick={handleEditOpen}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
              >
                Edit Recipe
              </button>
              <button 
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition shadow-md"
              >
                Delete Recipe
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
              Edit Recipe
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  required
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                <textarea
                  required
                  value={editForm.ingredients}
                  onChange={(e) => setEditForm({ ...editForm, ingredients: e.target.value })}
                  placeholder="List ingredients"
                  className="w-full border p-2 rounded h-24 focus:ring-2 focus:ring-green-500 outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                <textarea
                  required
                  value={editForm.instructions}
                  onChange={(e) => setEditForm({ ...editForm, instructions: e.target.value })}
                  placeholder="Step by step instructions"
                  className="w-full border p-2 rounded h-32 focus:ring-2 focus:ring-green-500 outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Time</label>
                <input
                  type="text"
                  value={editForm.time}
                  onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {editError && (
                <p className="text-red-500 text-sm text-center">{editError}</p>
              )}

              <button
                disabled={editLoading}
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded font-semibold hover:bg-green-800 transition disabled:bg-gray-400"
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🗑️</span>
            </div>
            <h2 className="text-gray-800 text-xl font-bold mb-2">Delete Recipe?</h2>
            <p className="text-gray-500 text-sm">
              Are you sure you want to delete this recipe? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;