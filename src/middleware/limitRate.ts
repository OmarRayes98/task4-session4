import rateLimit from "express-rate-limit";

export const createRateLimiter = (
  max: number,
  skipSuccessfulRequests = false,
) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: "Too many requests. Please try again after 15 minutes.",
      });
    },
  });
