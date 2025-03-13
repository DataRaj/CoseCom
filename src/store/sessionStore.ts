import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define type for session user data
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?:  string | null | undefined | undefined;
  createdAt: Date;
  updatedAt: Date;
  twoFactorEnabled: boolean | null | undefined;
  age?: number;
  firstName?: string;
  lastName?: string;
}

// Define session store state
interface SessionState {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  refreshSession: (session?: SessionUser | null) => void;
  clearSession: () => void;
  updateUser: (userData: Partial<SessionUser>) => void;

  getFullName: () => string | null;
  getInitials: () => string | null;
  getAvatarUrl: () => string | null;
  getUserId: () => string | null;
}

// Zustand Store with Persist
export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      refreshSession: (session) => {
        if (session) {
          set({
            user: session,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      clearSession: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      getFullName: () => {
        const user = get().user;
        return user?.name || `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || user?.email.split("@")[0] || null;
      },

      getInitials: () => {
        const user = get().user;
        if (!user) return null;
        return (user.name ?? `${user.firstName ?? ""}${user.lastName ?? ""}`)
          .split(" ")
          .map((part) => part[0])
          .join("")
          .toUpperCase()
          .substring(0, 2);
      },

      getAvatarUrl: () => get().user?.image ?? null,
      getUserId: () => get().user?.id ?? null,
    }),
    {
      name: "user-session",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
