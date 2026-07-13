import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";


dotenv.config();
const app = express();
const port = 3001;


console.log(process.env.DATABASE_URL,"..");
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("Failed to connect!", err));




app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
