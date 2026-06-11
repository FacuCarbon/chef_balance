import type { User } from "../types/recipe";
import { seedUsers } from "../data/users";

const USERS_KEY = "chefbalance.users";
const CURRENT_USER_KEY = "chefbalance.currentUserId";
const MARGIN_KEY = "chefbalance.margin";

export function readUsers(): User[] {
  const rawUsers = localStorage.getItem(USERS_KEY);

  if (!rawUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
    return seedUsers;
  }

  try {
    const users = JSON.parse(rawUsers) as User[];
    const migratedUsers = users.map((user) =>
      user.id === seedUsers[0].id ? { ...user, ...seedUsers[0] } : user
    );

    if (JSON.stringify(migratedUsers) !== rawUsers) {
      localStorage.setItem(USERS_KEY, JSON.stringify(migratedUsers));
    }

    return migratedUsers;
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
    return seedUsers;
  }
}

export function writeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function readCurrentUserId() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export function writeCurrentUserId(userId: string) {
  localStorage.setItem(CURRENT_USER_KEY, userId);
}

export function clearCurrentUserId() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function readMargin(defaultMargin: number) {
  const storedMargin = Number(localStorage.getItem(MARGIN_KEY));
  return Number.isFinite(storedMargin) && storedMargin > 0 ? storedMargin : defaultMargin;
}

export function writeMargin(margin: number) {
  localStorage.setItem(MARGIN_KEY, String(margin));
}
