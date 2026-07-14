import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { z } from "zod";
import User from "../models/user.model";
import { userValidationSchema } from "../validations/user.schema";
import { generateJWT } from "../utils/jwt";

// const hashPassword = async (password: string): Promise<string> => {
//   const saltRounds = 10;
//   return bcrypt.hash(password, saltRounds);
// };

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validatedData = userValidationSchema.parse(req.body);
    // const hashedPassword = await hashPassword(validatedData.password);

    const newUser = new User({ ...validatedData });
    await newUser.save();

    // const token = generateJWT({
    //   id: newUser._id.toString(),
    //   email: newUser.email,
    //   role: newUser.role,
    // });

    res.status(201).json({
      message: "User registered successfully",
      // token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const formatted = z.flattenError(error);

      res.status(400).json({
        errors: formatted.fieldErrors,
      });

      return;
    }
    if (error.code === 11000) {
      res.status(409).json({ error: "Email already exists" });
      return;
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: "ww Invalid credentials" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);


    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = generateJWT({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Validate request body using Zod
    const validatedData = userValidationSchema.parse(req.body);
    // const hashedPassword = await hashPassword(validatedData.password);

    const newUser = new User({ ...validatedData });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error: any) {
    // Handle Zod Validation Errors
    if (error instanceof z.ZodError) {
      const formatted = z.flattenError(error);

      res.status(400).json({
        errors: formatted.fieldErrors,
      });

      return;
    }
    // Handle MongoDB Duplicate Email Error (Code 11000)
    if (error.code === 11000) {
      res.status(409).json({ error: "Email already exists" });
      return;
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Return all users
export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Search users by email
export const searchUsersByEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const email = req.query.email as string;
    if (!email) {
      res.status(400).json({ error: "Email query parameter is required" });
      return;
    }

    const users = await User.find({ email: { $regex: email, $options: "i" } }); // Case-insensitive search
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Return a single user by ID
export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id as string;

    // Bonus: Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid MongoDB ObjectId format" });
      return;
    }

    const user = await User.findById(id);

    // Bonus: User not found error
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a user
export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid MongoDB ObjectId format" });
      return;
    }

    // Validate incoming data
    const validatedData = userValidationSchema.partial().parse(req.body); // partial() allows updating only specific fields

    const updateData: Record<string, unknown> = { ...validatedData };

    if (
      typeof updateData.password === "string" &&
      updateData.password.trim() !== ""
    ) {
      // updateData.password = await hashPassword(updateData.password);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });

    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const formatted = z.flattenError(error);

      res.status(400).json({
        errors: formatted.fieldErrors,
      });

      return;
    }
    if (error.code === 11000) {
      res.status(409).json({ error: "Email already exists" });
      return;
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a user
export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid MongoDB ObjectId format" });
      return;
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
