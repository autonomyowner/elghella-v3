import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import AuthService from "../api/AuthService";

export interface User {
  userId?: string;
  name?: string;
  email: string;
  telephone?: string;
  verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    telephone?: string;
  }) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const userData = await AuthService.getCurrentUser();
      if (!userData) throw new Error("No user");
      // Supabase user fields
      const formattedUser: User = {
        userId: userData.id,
        name: userData.user_metadata?.name,
        email: userData.email || "",
        telephone: userData.user_metadata?.telephone,
        verified: userData.email_confirmed_at ? true : false,
      };
      setUser(formattedUser);
      setIsAuthenticated(true);
    } catch (error: any) {
      // Automatic fix for Invalid Refresh Token
      if (
        error?.message?.includes("Invalid Refresh Token") ||
        error?.message?.includes("Refresh Token Not Found")
      ) {
        // Remove all Supabase auth keys from localStorage
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("sb-")) localStorage.removeItem(key);
        });
        window.location.reload();
      }
      setUser(null);
      setIsAuthenticated(false);
      console.error("Failed to refresh user", error);
    }
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        await refreshUser();
      } catch (error) {
        console.error("Session restoration failed", error);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    try {
      await AuthService.login({ email, password });
      await refreshUser();
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    telephone?: string;
  }) => {
    try {
      await AuthService.register(data);
      await refreshUser();
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated,
        loading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
