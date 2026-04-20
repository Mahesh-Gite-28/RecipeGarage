const Recipes = require("../models/recipe.js");

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    return res.json({ recipes });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

const getRecipe = async (req, res) => {
  try {
    const _Id = req.params.id;

    const recipe = await Recipes.findById(_Id);

    res.json(recipe);
  } catch (err) {
    res.json({ message: "error" });
  }
};

const myRecipes = (req, res) => {
  res.json(" my recipes");
};

const getfavRecipes = (req, res) => {};

const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  if (!title || !ingredients || !instructions) {
    res.json({ message: "Required fields cant be empty " });
  }

  try {
    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time,
    });

    return res.json(newRecipe);
  } catch (err) {
    return res.json({ message: error.message });
  }
};

const delRecipe = async (req, res) => {
  try {
    const _id = req.params.id;

    const deletedRecipe = await Recipes.findByIdAndDelete(_id);

    res.json(deletedRecipe);
  } catch (err) {
    res.json({ message: "error" });
  }
};

const editRecipe = async (req, res) => {
  try {
    const _id = req.params.id;

    const updateData = req.body;

    const updatedRecipe = await Recipes.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    res.json(updatedRecipe);
  } catch (err) {
    res.json({ message: "error" });
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
};
