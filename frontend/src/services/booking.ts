import api from "./api";
import type { Booking, ApiResponse, Paginated } from "@/types";

export const bookingService = {
  getAll:  (params?: { page?: number; limit?: number }) =>
    api.get<ApiResponse<Paginated<Booking>>>("/bookings", { params }),
  getOne:  (id: string) =>
    api.get<ApiResponse<Booking>>(`/bookings/${id}`),
  create:  (data: { loungeId: string; visitDate: string; guestCount?: number; flightNumber?: string; notes?: string }) =>
    api.post<ApiResponse<Booking>>("/bookings", data),
  cancel:  (id: string) =>
    api.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`),
};
