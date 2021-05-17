import React from "react";
import AuthLayout from "../Layouts/AuthLayout";
import LoginContainer from "../containers/LoginContainer";
import useRedirectIfLogedin from "../hooks/useRedirectIfLogedin";

const LoginPage = (props) => {
  useRedirectIfLogedin();
  return (
    <AuthLayout>
      <LoginContainer />
    </AuthLayout>
  );
};

export default LoginPage;
