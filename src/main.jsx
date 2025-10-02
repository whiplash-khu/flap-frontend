// 여기다가 라우팅해놓음
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import LoginPage from "./pages/authentication/LoginPage.jsx";
import SignupWelcomePage from "./pages/authentication/SignupWelcomePage.jsx";
import SignupEmailPage from "./pages/authentication/SignupEmailPage.jsx";
import SignupVerifyPage from "./pages/authentication/SignupVerifyPage.jsx";
import SignupPasswordPage from "./pages/authentication/SignupPasswordPage.jsx";
import UserInfoPage from "./pages/authentication/UserInfoPage.jsx";
import SchoolInfoPage from "./pages/authentication/SchoolInfoPage.jsx";
import SignupCompletePage from "./pages/authentication/SignupCompletePage.jsx";
import ProfileSetupPage from "./pages/authentication/ProfileSetupPage.jsx";
import SignupFinalPage from "./pages/authentication/SignupFinalPage.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupWelcomePage /> },
  { path: "/signup/email", element: <SignupEmailPage /> },
  { path: "/signup/verify", element: <SignupVerifyPage /> },
  { path: "/signup/password", element: <SignupPasswordPage /> },
  { path: "/signup/user-info", element: <UserInfoPage /> },
  { path: "/signup/school-info", element: <SchoolInfoPage /> },
  { path: "/signup/complete", element: <SignupCompletePage /> },
  { path: "/profile-setup", element: <ProfileSetupPage /> },
  { path: "/signup/final", element: <SignupFinalPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
