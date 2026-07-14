import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { ExtendRequest } from "../types/extendedRequest";

const validateJWT = async (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(401).json({
      success: false,
      code: "NO_TOKEN",
      message: "Authorization header was not provided",
    });
    return;
  }

  const [bearer, token] = authorizationHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    res.status(401).json({
      success: false,
      code: "INVALID_AUTH_FORMAT",
      message: "Invalid authorization format",
    });
    return;
  }

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        res.status(401).json({
          success: false,
          code: "TOKEN_EXPIRED",
          message: "Token has expired",
        });
        return;
      }

      res.status(401).json({
        success: false,
        code: "INVALID_TOKEN",
        message: "Invalid token",
      });
      return;
    }

    if (!payload || typeof payload === "string") {
      res.status(401).json({
        success: false,
        code: "INVALID_TOKEN_PAYLOAD",
        message: "Invalid token payload",
      });
      return;
    }

    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string;
    };

    const user = await userModel.findOne({
      email: userPayload.email,
    });

    if (!user) {
      res.status(401).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
      return;
    }

    req.user = user;

    next();
  });
};

export default validateJWT;