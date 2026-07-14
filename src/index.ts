import dotenv from "dotenv";

import express from "express";
import connectDB from "./database/connection";
import userRoutes from "./routes/user.routes";
import { seedInitialUsers } from "./seed/users";


dotenv.config();
const app = express();
const port = 3001;


app.use(express.json());


connectDB();

// Seed the users to database
seedInitialUsers();

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
