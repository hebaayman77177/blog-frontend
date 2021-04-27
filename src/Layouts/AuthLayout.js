import React from "react";
import AppBar from "../components/AppBar";

const AuthLayout = ({ children }) => {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
};

export default AuthLayout;
