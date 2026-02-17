import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password, navigate) => {
    try {
      const { data } = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (navigate) navigate("/");

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed",
      };
    }
  };

  // REGISTER
  const register = async (name, email, password, navigate) => {
    try {
      await axiosInstance.post("/user/register", {
        name,
        email,
        password,
      });

      if (navigate) navigate("/");

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Registration failed",
      };
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
