"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import LoginForm from "@/components/LoginForm";
import TodoDashboard from "@/components/TodoDashboard";
import { getAuthToken } from "@/lib/utils";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const token = getAuthToken();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (token && username) {
      setCurrentUser(username);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();

      setCurrentUser(data.username);
      setIsLoggedIn(true);

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.username);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const res = await response.json();

      if (response.ok) {
        setCurrentUser("");
        setIsLoggedIn(false);
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        toast(res.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <TodoDashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}
