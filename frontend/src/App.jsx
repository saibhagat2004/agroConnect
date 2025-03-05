import { Navigate, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login/loginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./component/NavBar";

function App() {
  const [isGuest, setIsGuest] = useState(false); // Track if the user is browsing as a guest

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      if (isGuest) return null; // If guest mode is active, don't fetch user data
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    enabled: !isGuest, // Only fetch user data if not in guest mode
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar isGuest={isGuest} setIsGuest={setIsGuest} /> {/* Pass guest state to Navbar */}
      <Routes>
        <Route path="/" element={authUser || isGuest ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser && !isGuest ? <LoginPage setIsGuest={setIsGuest} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
