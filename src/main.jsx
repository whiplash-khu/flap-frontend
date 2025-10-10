// 여기는 라우터 경로
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
import MyPage from "./pages/mypage/MyPage.jsx";
import ProfileEditPage from "./pages/mypage/ProfileEditPage.jsx";
import SecurityPage from "./pages/mypage/SecurityPage.jsx";
import NotificationsPage from "./pages/mypage/NotificationsPage.jsx";
import NoticesPage from "./pages/mypage/NoticesPage.jsx";
import SupportPage from "./pages/mypage/SupportPage.jsx";
import ChangePasswordPage from "./pages/mypage/ChangePasswordPage.jsx";
import ChangeBirthdatePage from "./pages/mypage/ChangeBirthdatePage.jsx";
import WithdrawPage from "./pages/mypage/WithdrawPage.jsx";
import WithdrawCompletePage from "./pages/mypage/WithdrawCompletePage.jsx";
import CreateGroupPage from "./pages/creategroup/CreateGroupPage.jsx";
import CreateGroupDescriptionPage from "./pages/creategroup/CreateGroupDescriptionPage.jsx";
import CreateGroupQuestionPage from "./pages/creategroup/CreateGroupQuestionPage.jsx";
import CreateGroupCompletePage from "./pages/creategroup/CreateGroupCompletePage.jsx";

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
  { path: "/mypage", element: <MyPage /> },
  { path: "/mypage/edit-profile", element: <ProfileEditPage /> },
  { path: "/mypage/security", element: <SecurityPage /> },
  { path: "/mypage/notifications", element: <NotificationsPage /> },
  { path: "/mypage/notices", element: <NoticesPage /> },
  { path: "/mypage/support", element: <SupportPage /> },
  { path: "/mypage/change-password", element: <ChangePasswordPage /> },
  { path: "/mypage/change-birthdate", element: <ChangeBirthdatePage /> },
  { path: "/mypage/withdraw", element: <WithdrawPage /> },
  { path: "/mypage/withdraw-complete", element: <WithdrawCompletePage /> },
  { path: "/creategroup/create", element: <CreateGroupPage /> },
  { path: "/creategroup/description", element: <CreateGroupDescriptionPage /> },
  { path: "/creategroup/questions", element: <CreateGroupQuestionPage /> },
  { path: "/group/create-complete", element: <CreateGroupCompletePage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
