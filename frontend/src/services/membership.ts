import api from "./api";
import type { Membership, ApiResponse } from "@/types";

export const membershipService = {
  get:      () => api.get<ApiResponse<Membership | null>>("/membership"),
  update:   (data: Partial<Membership>) => api.put<ApiResponse<Membership>>("/membership", data),
  activate: (dragonpassMemberId: string) =>
    api.post<ApiResponse<Membership>>("/membership/activate", { dragonpassMemberId }),
};
