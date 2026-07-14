
import { z } from 'zod';


export const userValidationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  role: z.enum(["admin", "user"], "Role must be either 'admin' or 'user'"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter",
    )
    .regex(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter",
    )
    .regex(/^(?=.*\d)/, "Password must contain at least one number")
    .regex(
      /^(?=.*[@$!%*?&])/,
      "Password must contain at least one special character",
    )
    .regex(/^\S*$/, "Password must not contain spaces"), // No spaces allowed
});


export type CreateUserInput = z.infer<typeof userValidationSchema>;