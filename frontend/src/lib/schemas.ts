import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("Username cannot be empty"),
  password: z.string().nonempty("Password cannot be empty"),
});

export const registerSchema = z
  .object({
    username: z.string().nonempty("Username cannot be empty"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
