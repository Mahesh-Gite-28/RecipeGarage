// Updated recipe controller with proper status codes and auth integration
const Recipes = require("../models/recipe.js");

// GET all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    return res.status(200).json({ recipes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET single recipe by ID
const getRecipe = async (req, res) => {
  try {
    const _id = req.params.id;
    const recipe = await Recipes.findById(_id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET recipes created by the logged‑in user
const myRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipes = await Recipes.find({ createdBy: userId });
    return res.status(200).json({ recipes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET favourite recipes of the logged‑in user
const getfavRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    // Populate favourites from User model
    const User = require("../models/user.js");
    const user = await User.findById(userId).select("favourites");
    const recipes = await Recipes.find({ _id: { $in: user.favourites } });
    return res.status(200).json({ recipes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST add a new recipe (protected)
const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: "Required fields can't be empty" });
  }

  try {
    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time,
      createdBy: req.user.id,
      coverImage: req.file ? req.file.path : undefined,
    });
    return res.status(201).json(newRecipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DELETE a recipe (protected, only owner can delete)
const delRecipe = async (req, res) => {
  try {
    const _id = req.params.id;
    const recipe = await Recipes.findById(_id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }
    await Recipes.findByIdAndDelete(_id);
    return res.status(200).json({ message: "Recipe deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// PATCH edit a recipe (protected, only owner can edit)
const editRecipe = async (req, res) => {
  try {
    const _id = req.params.id;
    const recipe = await Recipes.findById(_id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this recipe" });
    }
    const updatedRecipe = await Recipes.findByIdAndUpdate(_id, req.body, { new: true });
    return res.status(200).json(updatedRecipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST toggle favourite (protected)
const toggleFavourite = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const User = require("../models/user.js");
    const user = await User.findById(req.user.id);
    const favIndex = user.favourites.indexOf(recipeId);
    if (favIndex === -1) {
      user.favourites.push(recipeId);
    } else {
      user.favourites.splice(favIndex, 1);
    }
    await user.save();
    return res.status(200).json({ favourites: user.favourites });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipe,
  addRecipe,
  getfavRecipes,
  myRecipes,
  delRecipe,
  editRecipe,
  toggleFavourite,
};


