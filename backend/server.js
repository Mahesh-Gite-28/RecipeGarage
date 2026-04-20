require("dotenv").config();

const express = require("express");

const app = express();

const connectDB=require("./config/db.js");

connectDB();

const router=require("./routes/recipe.js")

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api",router);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
