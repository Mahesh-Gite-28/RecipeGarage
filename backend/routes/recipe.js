const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // import auth middleware
const { upload } = require("../config/cloudinary");

const { getAllRecipes, getRecipe, getfavRecipes, addRecipe, myRecipes, delRecipe, editRecipe, toggleFavourite } = require("../controller/recipe"); // controllers

router.get("/", getAllRecipes);
router.get("/favRecipe", auth, getfavRecipes);
router.get("/myRecipe", auth, myRecipes);
router.get("/:id", getRecipe);

// Protected routes
router.post("/addRecipe", auth, (req, res, next) => {
  upload.single("coverImage")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || "Image upload failed" });
    }
    next();
  });
}, addRecipe);
router.delete("/:id/delete", auth, delRecipe);
router.patch("/:id/edit", auth, editRecipe);
router.post("/:id/favourite", auth, toggleFavourite);

module.exports = router;