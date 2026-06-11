import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/recipe";
import {
  clearCurrentUserId,
  readCurrentUserId,
  readUsers,
  writeCurrentUserId,
  writeUsers
} from "../lib/storage";
import { AuthContext } from "./authContextObject";
import type { RegisterData } from "./authContextObject";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => readUsers());
  const [currentUserId, setCurrentUserId] = useState<string | null>(() => readCurrentUserId());

  const currentUser = useMemo(
    () => users.find((user) => user.id === currentUserId) ?? null,
    [currentUserId, users]
  );

  const login = useCallback((email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(
      (candidate) => candidate.email === normalizedEmail && candidate.password === password
    );

    if (!user) {
      return "Revisa el correo y la contrasena.";
    }

    writeCurrentUserId(user.id);
    setCurrentUserId(user.id);
    return null;
  }, [users]);

  const register = useCallback((data: RegisterData) => {
    const normalizedEmail = data.email.trim().toLowerCase();

    if (users.some((user) => user.email === normalizedEmail)) {
      return "Ya existe una cuenta con ese correo.";
    }

    const user: User = {
      ...data,
      id: `user-${crypto.randomUUID()}`,
      email: normalizedEmail
    };
    const nextUsers = [...users, user];

    writeUsers(nextUsers);
    writeCurrentUserId(user.id);
    setUsers(nextUsers);
    setCurrentUserId(user.id);
    return null;
  }, [users]);

  const logout = useCallback(() => {
    clearCurrentUserId();
    setCurrentUserId(null);
  }, []);

  const value = useMemo(
    () => ({ currentUser, login, register, logout }),
    [currentUser, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
