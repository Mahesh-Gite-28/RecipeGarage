const express=require("express");

const router=express.Router();

const {getAllRecipes,getRecipe,getfavRecipes,addRecipe,myRecipes,delRecipe,editRecipe}=require("../controller/recipe");//controllers


router.get("/", getAllRecipes);


router.get("/favRecipe", getfavRecipes);
router.get("/myRecipe", myRecipes);

router.post("/addRecipe", addRecipe);


router.delete("/:id/delete", delRecipe);
router.patch("/:id/edit", editRecipe);

router.get("/:id", getRecipe);   

module.exports=router;