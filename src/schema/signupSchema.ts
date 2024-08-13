import { z } from "zod";
export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters long")
  .max(20, "Username must be no more than 20 characters long")
  .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special character");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters long")
    .max(20, "Password must be no more than 20 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase",
    ),
});
