"use client";
import { create } from "zustand";

interface UIStore {
  sidebarOpen:      boolean;
  sidebarCollapsed: boolean;
  toggleSidebar:          () => void;
  setSidebarOpen:         (v: boolean) => void;
  toggleSidebarCollapsed: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen:      true,
  sidebarCollapsed: false,
  toggleSidebar:          () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen:         (v) => set({ sidebarOpen: v }),
  toggleSidebarCollapsed: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));
