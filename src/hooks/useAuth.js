import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function useAuth() {
  const { state: AuthContextState } = useContext(AuthContext);
  return AuthContextState;
}

export default useAuth;
