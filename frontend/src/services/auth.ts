import api from "./api";
import type { User, ApiResponse } from "@/types";

interface AuthPayload { user: User; token: string; }

export const authService = {
  login:          (email: string, password: string) =>
    api.post<ApiResponse<AuthPayload>>("/auth/login", { email, password }),
  signup:         (data: object) =>
    api.post<ApiResponse<AuthPayload>>("/auth/signup", data),
  forgotPassword: (email: string) =>
    api.post<ApiResponse<null>>("/auth/forgot-password", { email }),
  resetPassword:  (token: string, password: string) =>
    api.post<ApiResponse<null>>("/auth/reset-password", { token, password }),
  getMe:          () =>
    api.get<ApiResponse<User>>("/auth/me"),
};
