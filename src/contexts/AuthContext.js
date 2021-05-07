import * as React from "react";
const AuthContext = React.createContext();

const editLocalStorage = (token, name, email,id) => {
  localStorage.setItem("blog-app-77177-token", token);
  localStorage.setItem("blog-app-77177-name", name);
  localStorage.setItem("blog-app-77177-email", email);
  localStorage.setItem("blog-app-77177-id", id);
};

const initState = {
  token: localStorage.getItem("blog-app-77177-token") || null,
  name: localStorage.getItem("blog-app-77177-name") || null,
  email: localStorage.getItem("blog-app-77177-email") || null,
  id: localStorage.getItem("blog-app-77177-id") || null,
};

function AuthReducer(state, action) {
  switch (action.type) {
    case "SAVE_USER": {
      editLocalStorage(
        action.payload.token,
        action.payload.name,
        action.payload.email,
        action.payload.id,
      );
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.name,
        email: action.payload.email,
        id:action.payload.id
      };
    }
    case "REMOVE_USER": {
      editLocalStorage(null, null, null);
      return { ...state, token: null, name: null, email: null,id:null };
    }
    default: {
      return state;
    }
  }
}
function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(AuthReducer, initState);
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth, AuthContext };
