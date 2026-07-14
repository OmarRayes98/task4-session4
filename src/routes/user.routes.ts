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
import { createRateLimiter } from "../middleware/limitRate";

const router = Router();

// Routes
router.post("/register",createRateLimiter(3), registerUser);
router.post("/login", createRateLimiter(5,true), loginUser);
router.post("/", validateJWT, createUser);
router.get("/", getAllUsers);

router.get("/search", validateJWT, searchUsersByEmail);

router.get("/:id", validateJWT, getUserById);
router.put("/:id", validateJWT, updateUser);
router.delete("/:id", validateJWT, authorizeRole(["admin"]), deleteUser);

export default router;
