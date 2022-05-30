import React from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../../components/AuthProvider/AuthProvider";
import { logout } from "../../firebase/firebase";

const SignOutView = () => {
  const navigate = useNavigate();

  async function handleUserLoggedIn(user) {
    await logout();
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    ></AuthProvider>
  );
};

export default SignOutView;
