import React from "react";
import AuthLayout from "../Layouts/AuthLayout";
import LoginContainer from "../containers/LoginContainer";

const LoginPage = (props) => {
  return (
    <AuthLayout>
      <LoginContainer />
    </AuthLayout>
  );
};

export default LoginPage;
