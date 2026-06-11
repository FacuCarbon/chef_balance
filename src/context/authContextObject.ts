import { createContext } from "react";
import type { User } from "../types/recipe";

export type RegisterData = Omit<User, "id">;

export type AuthContextValue = {
  currentUser: User | null;
  login: (email: string, password: string) => string | null;
  register: (data: RegisterData) => string | null;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
