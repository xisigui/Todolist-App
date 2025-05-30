"use client";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <div>Dashboard</div>}
    </div>
  );
}
