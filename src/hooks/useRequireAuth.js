import { useEffect } from "react";
import useAuth from "./useAuth";
import { useHistory } from "react-router-dom";

function useRequireAuth(redirectUrl = "/signup") {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (auth.token === null) {
      history.push(redirectUrl);
    }
  }, [auth, history]);
  return auth;
}

export default useRequireAuth;
