import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsersByEmail,
} from "../controllers/user.controller";
import validateJWT from "../middleware/validateJWT";

const router = Router();

// Routes
router.post("/", validateJWT, createUser);
router.get("/", validateJWT, getAllUsers);

router.get("/search", validateJWT, searchUsersByEmail);

router.get("/:id", validateJWT, getUserById);
router.put("/:id", validateJWT, updateUser);
router.delete("/:id", validateJWT, deleteUser);

export default router;
