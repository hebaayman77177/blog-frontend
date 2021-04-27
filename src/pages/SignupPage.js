import React from "react";
import AuthLayout from "../Layouts/AuthLayout";

import SignUpContainer from "../containers/SignupContainer";

const SignupPage = (props) => {
  return (
    <AuthLayout>
      <SignUpContainer />
    </AuthLayout>
  );
};

export default SignupPage;
