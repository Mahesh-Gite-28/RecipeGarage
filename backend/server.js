require("dotenv").config();

const express = require("express");

const app = express();
const cors = require("cors");


app.use(cors({
  origin: "http://localhost:5173", // ❗ NOT "*"
  credentials: true               // ❗ REQUIRED for cookies
}));

const connectDB=require("./config/db.js");

connectDB();

const router=require("./routes/recipe.js")

const userRouter=require("./routes/user.js");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api",router);

app.use("/api",userRouter);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
