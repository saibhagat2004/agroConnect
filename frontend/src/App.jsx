import { Navigate, Route,Routes } from "react-router-dom"
import React from 'react'
import { lazy, Suspense } from "react";
import HomePage from './pages/home';
import LoginPage from './pages/auth/login/loginPage';
import SignUpPage from "./pages/auth/signup/SignUpPage";
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import Navbar from "./component/NavBar";

function App() {

  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
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
    retry: false, // Only load once
  });

  if (isLoading) {
    // return (
    //   <div className="h-screen flex justify-center items-center">
    //     <LoadingSpinner size="lg" />
    //   </div>
    // );
  }



  return (
    <>
      <Suspense fallback={    <div className="h-screen flex justify-center items-center">
        {/* <LoadingSpinner size="lg" /> */}
      </div>}>
        {/* {(authUser) && (
          <div className="sticky top-0 z-50 col-span-12">
            <Navbar isGuest={isGuest} setIsGuest={setIsGuest}/>
          </div>
        )} */}
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              !authUser  ? (
                <LoginPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
