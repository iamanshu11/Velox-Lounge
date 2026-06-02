import api from "./api";
import type { User, ApiResponse } from "@/types";

export const profileService = {
  update:         (data: { first_name: string; last_name: string; phone?: string }) =>
    api.put<ApiResponse<User>>("/profile", data),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.patch<ApiResponse<null>>("/profile/password", data),
};
