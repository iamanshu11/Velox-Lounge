import { z } from "zod";

export const loginSchema = z.object({
  email:    z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  first_name:      z.string().min(2, "Min 2 characters"),
  last_name:       z.string().min(2, "Min 2 characters"),
  email:           z.string().email("Invalid email"),
  phone:           z.string().optional(),
  password:        z.string().min(8, "Min 8 characters").regex(/[A-Z]/, "Needs uppercase").regex(/[0-9]/, "Needs number"),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

export const forgotSchema = z.object({ email: z.string().email("Invalid email") });

export const resetSchema = z.object({
  token:           z.string().min(1),
  password:        z.string().min(8, "Min 8 characters").regex(/[A-Z]/).regex(/[0-9]/),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

export const profileSchema = z.object({
  first_name: z.string().min(2, "Min 2 characters"),
  last_name:  z.string().min(2, "Min 2 characters"),
  phone:      z.string().optional(),
});

export const passwordSchema = z.object({
  currentPassword:    z.string().min(1, "Required"),
  newPassword:        z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  confirmNewPassword: z.string(),
}).refine(d => d.newPassword === d.confirmNewPassword, { message: "Passwords don't match", path: ["confirmNewPassword"] });

export type LoginInput    = z.infer<typeof loginSchema>;
export type SignupInput   = z.infer<typeof signupSchema>;
export type ProfileInput  = z.infer<typeof profileSchema>;
export type PasswordInput = z.infer<typeof passwordSchema>;
