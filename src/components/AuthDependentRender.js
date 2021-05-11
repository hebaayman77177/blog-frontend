import React from "react";
import useAuth from "../hooks/useAuth";

const AuthDependentRender = ({ IfAuthComponent, IfNotAuthComponent }) => {
  const auth = useAuth();
  return <>{auth.token === null ? IfNotAuthComponent : IfAuthComponent}</>;
};

export default AuthDependentRender;
