import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.VITE_API_BASE || "http://localhost:5000/api"}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Logout request failed", e);
    }
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const updateFavourites = (newFavourites) => {
    const updatedUser = { ...user, favourites: newFavourites };
    setUser(updatedUser);
    localStorage.setItem("authUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateFavourites }}>
      {children}
    </AuthContext.Provider>
  );
};
