import { Router } from "express";
import {
  registerUser,
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsersByEmail,
} from "../controllers/user.controller";
import validateJWT from "../middleware/validateJWT";
import { authorizeRole } from "../middleware/authorizeRole";

const router = Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/", validateJWT, createUser);
router.get("/", getAllUsers);

router.get("/search", validateJWT, searchUsersByEmail);

router.get("/:id", validateJWT, getUserById);
router.put("/:id", validateJWT, updateUser);
router.delete("/:id", validateJWT, authorizeRole(["admin"]), deleteUser);

export default router;
