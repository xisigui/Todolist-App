"use client";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import TodoDashboard from "@/components/TodoDashboard";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");

  const handleLogin = (username: string, password: string) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    setCurrentUser("");
    setIsLoggedIn(false);
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
