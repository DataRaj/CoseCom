import { useSession as useAuthSession } from "@/lib/auth-client";
import { useSessionStore } from "@/store/sessionStore";
import { useEffect } from "react";


// Custom hook for syncing session

export const useSessionData = () => {
  // @ts-expect-error status is not defined in useAuthSession 
  const { data: session, status } = useAuthSession();
  const { refreshSession, clearSession, isLoading, ...state } = useSessionStore();

  useEffect(() => {
    if (status === "authenticated") {
      refreshSession(session?.user ?? null);
    } else if (status === "unauthenticated") {
      clearSession();
    }
  }, [status, session?.user, refreshSession, clearSession]);

  return { ...state, isLoading: status === "loading" || isLoading };
};
