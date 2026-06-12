"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
};

export type Booking = {
  id: string;
  userId: string;
  gerId: string;
  gerName: string;
  gerNameMn: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  nights: number;
  pricePerNight: number;
  totalPrice: number;
  status: "active" | "canceled";
  createdAt: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => boolean;
  register: (data: Omit<User, "id">) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => boolean;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "userId" | "createdAt" | "status">) => Booking | null;
  cancelBooking: (bookingId: string) => boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function LocalAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("talbiun-user");
    const storedBookings = localStorage.getItem("talbiun-bookings");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    }
    if (storedBookings) {
      try {
        setBookings(JSON.parse(storedBookings));
      } catch {}
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("talbiun-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("talbiun-user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("talbiun-bookings", JSON.stringify(bookings));
  }, [bookings]);

  const login = useCallback((email: string, password: string) => {
    const users = getUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  }, []);

  const register = useCallback((data: Omit<User, "id">) => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return false;
    }
    const newUser: User = { ...data, id: generateId() };
    users.push(newUser);
    localStorage.setItem("talbiun-users", JSON.stringify(users));
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    if (!user) return false;
    const users = getUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index === -1) return false;
    const updated = { ...users[index] };
    if (data.firstName !== undefined) updated.firstName = data.firstName;
    if (data.lastName !== undefined) updated.lastName = data.lastName;
    if (data.phone !== undefined) updated.phone = data.phone;
    if (data.email !== undefined) updated.email = data.email;
    if (data.password !== undefined) updated.password = data.password;
    users[index] = updated;
    localStorage.setItem("talbiun-users", JSON.stringify(users));
    setUser(updated);
    return true;
  }, [user]);

  const changePassword = useCallback((currentPassword: string, newPassword: string) => {
    if (!user) return false;
    if (user.password !== currentPassword) return false;
    return updateProfile({ password: newPassword });
  }, [user, updateProfile]);

  const addBooking = useCallback((booking: Omit<Booking, "id" | "userId" | "createdAt" | "status">) => {
    if (!user) return null;
    const newBooking: Booking = {
      ...booking,
      id: generateId(),
      userId: user.id,
      status: "active",
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [...prev, newBooking]);
    return newBooking;
  }, [user]);

  const cancelBooking = useCallback((bookingId: string) => {
    if (!user) return false;
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId && b.userId === user.id ? { ...b, status: "canceled" as const } : b))
    );
    return true;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        bookings: user ? bookings.filter((b) => b.userId === user.id) : [],
        addBooking,
        cancelBooking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useLocalAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useLocalAuth must be used within LocalAuthProvider");
  return ctx;
}

function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("talbiun-users");
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
