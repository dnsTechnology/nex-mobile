import { useRouter, useSegments } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import {
  useLoginClientMutation,
  useLogoutClientMutation,
} from "../api/authApi";
import { tokenManager } from "../utils/tokenManager";

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: any | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const segments = useSegments();

  const [loginMutation] = useLoginClientMutation();
  const [logoutMutation] = useLogoutClientMutation();

  // -----------------------------
  // Load user on app start
  // -----------------------------
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await tokenManager.getUser();
        const accessToken = await tokenManager.getAccessToken();

        if (storedUser && accessToken) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // -----------------------------
  // Redirect based on auth state
  // -----------------------------
  useEffect(() => {
    if (isLoading) return;

    const isLoginPage = (segments as string[]).includes("/client/login");
    const isAuthenticated = !!user;

    if (!isAuthenticated && !isLoginPage) {
      router.replace("/client/login");
      return;
    }

    if (isAuthenticated && isLoginPage) {
      router.replace("/client/home");
      return;
    }
  }, [isLoading, user, segments]);

  // -----------------------------
  // Login
  // -----------------------------
  const login = async (email: string, password: string) => {
    try {
      const response: any = await loginMutation({ email, password });
      console.log("response", response);

      if (response.error) {
        Alert.alert("Error", "Failed to login. Try again later.");
        return;
      }

      if (response?.data?.success) {
        const loggedUser = response?.data?.user;
        await tokenManager.setUser(loggedUser);
        await tokenManager.setTokens(response?.data?.token as string);

        setUser(loggedUser);

        Alert.alert("Success", response.data.message || "Logged in!");
        router.replace("/client/home");
      } else {
        Alert.alert(
          "Error",
          response?.data?.message || "Failed to login. Try again later.",
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // Logout
  // -----------------------------
  const logout = async () => {
    try {
      const res = await logoutMutation({}).unwrap();
      if (res?.result?.success) {
        Alert.alert("Success", "Logged out successfully!");
      } else {
        Alert.alert("Error", "Failed to logout. Try again later.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to logout. Try again later.");
    } finally {
      setUser(null);
      router.replace("/client/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthClient() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthClient must be used within an AuthProvider");
  }

  return context;
}
