import { Response, NextFunction } from "express";
import { ExtendRequest } from "../types/extendedRequest";

export const authorizeRole = (roles: ("admin" | "user")[]) => {
  return (
    req: ExtendRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Forbidden",
      });
      return;
    }

    next();
  };
};