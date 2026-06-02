import api from "./api";
import type { EPass, ApiResponse, Paginated } from "@/types";

export const epassService = {
  getAll:  (params?: { page?: number; limit?: number }) =>
    api.get<ApiResponse<Paginated<EPass>>>("/epasses", { params }),
  getOne:  (id: string) => api.get<ApiResponse<EPass>>(`/epasses/${id}`),
  create:  (data: object) => api.post<ApiResponse<EPass>>("/epasses", data),
  cancel:  (id: string)   => api.patch<ApiResponse<EPass>>(`/epasses/${id}/cancel`),
};
