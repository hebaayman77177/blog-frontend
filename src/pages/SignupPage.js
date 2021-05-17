import React from "react";
import AuthLayout from "../Layouts/AuthLayout";

import SignUpContainer from "../containers/SignupContainer";
import useRedirectIfLogedin from "../hooks/useRedirectIfLogedin";

const SignupPage = (props) => {
  useRedirectIfLogedin();
  return (
    <AuthLayout>
      <SignUpContainer />
    </AuthLayout>
  );
};

export default SignupPage;
