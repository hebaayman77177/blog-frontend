import { useEffect } from "react";
// import useAuth from "./useAuth";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function useRedirectIfLogedin(redirectUrl = "/") {
  const { state: auth } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (auth.token !== null) {
      history.push(redirectUrl);
    }
  }, [auth, history]);
  return auth;
}

export default useRedirectIfLogedin;
