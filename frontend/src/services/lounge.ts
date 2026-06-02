import api from "./api";
import type { Lounge, ApiResponse, Paginated } from "@/types";

export const loungeService = {
  getAll: (params?: { page?: number; limit?: number; search?: string; country?: string }) =>
    api.get<ApiResponse<Paginated<Lounge>>>("/lounges", { params }),
  getOne: (id: string) =>
    api.get<ApiResponse<Lounge>>(`/lounges/${id}`),
};
