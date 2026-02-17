import React, { createContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores logged-in user
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // Login function with navigate
  const login = async (email, password, navigate) => {
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      setUser(data.user);
      console.log(data.user, "user loged in");
      
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect after successful login
      if (navigate) navigate("/");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Register function with navigate
  const register = async (name, email, password, navigate) => {
    try {
      const res = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
            console.log(data, "registered user");

      if (!res.ok) throw new Error(data.message || "Registration failed");

      // Redirect after successful registration
      if (navigate) navigate("/"); // or "/"
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
