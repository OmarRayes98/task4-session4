import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3001;

// mongoose
//   .connect(process.env.DATABASE_URL || "")
//   .then(() => console.log("Mongo connected!"))
//   .catch((err) => console.log("Failed to connect!", err));




app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
