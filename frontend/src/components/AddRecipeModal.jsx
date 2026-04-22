import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const AddRecipeModal = ({ show, setShow, onRecipeAdded }) => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("ingredients", form.ingredients);
      formData.append("instructions", form.instructions);
      formData.append("time", form.time);
      if (imageFile) {
        formData.append("coverImage", imageFile);
      }

      const res = await fetch(`${API_BASE}/addRecipe`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        onRecipeAdded();
        setShow(false);
        setForm({ title: "", ingredients: "", instructions: "", time: "" });
        setImageFile(null);
      } else {
        setError(data.message || "Failed to add recipe");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative overflow-y-auto max-h-[90vh]">
        <button 
          onClick={() => setShow(false)}
          className="absolute top-2 right-4 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          Share Your Recipe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              required
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Recipe Title"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
            <textarea
              required
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              placeholder="List ingredients (separated by comma or newline)"
              className="w-full border p-2 rounded h-24 focus:ring-2 focus:ring-green-500 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
            <textarea
              required
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              placeholder="Step by step instructions"
              className="w-full border p-2 rounded h-32 focus:ring-2 focus:ring-green-500 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Time</label>
            <input
              type="text"
              name="time"
              value={form.time}
              onChange={handleChange}
              placeholder="e.g. 30 mins"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            {imageFile && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="h-32 w-full object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded font-semibold hover:bg-green-800 transition disabled:bg-gray-400"
          >
            {loading ? "Adding..." : "Add Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeModal;