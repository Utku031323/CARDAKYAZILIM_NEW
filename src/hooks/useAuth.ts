import { useState, useCallback, useEffect } from "react";
import { AdminUser } from "@/types/admin";
import { apiClient } from "@/lib/api-client";

interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface MeResponse {
  id: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      try {
        const user = JSON.parse(storedUser);
        return {
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        };
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    };
  });

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken && !state.isAuthenticated) {
        try {
          const response = await apiClient.get<MeResponse>("/auth/me");
          if (response.data) {
            const user: AdminUser = {
              id: response.data.id,
              email: response.data.email,
              name: response.data.email.split("@")[0],
              role: response.data.role as "admin" | "manager" | "viewer",
              createdAt: new Date(),
            };
            localStorage.setItem("user", JSON.stringify(user));
            setState({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
        } catch (error) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
        }
      }
    };

    verifyToken();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Call real API
      const response = await apiClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      if (!response.data) {
        throw new Error("Giriş başarısız oldu");
      }

      const { user: apiUser, accessToken, refreshToken } = response.data;

      // Map API response to AdminUser
      const user: AdminUser = {
        id: apiUser.id,
        email: apiUser.email,
        name: apiUser.email.split("@")[0], // Use email prefix as name
        role: apiUser.role as "admin" | "manager" | "viewer",
        createdAt: new Date(),
      };

      // Store tokens and user in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Giriş başarısız oldu";
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Call logout API
      await apiClient.post("/auth/logout", {});
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
  };
};

