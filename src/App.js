import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/posts/CreatePostPage";
import EditPostPage from "./pages/posts/EditPostPage";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./globals/muiTheme";
import ShowPostPage from "./pages/posts/ShowPostPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <div>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <SignupPage />
              </Route>
              <Route path="/create-post">
                <CreatePostPage />
              </Route>
              <Route path="/edit-post/:id">
                <EditPostPage />
              </Route>
              <Route path="/show-post/:id">
                <ShowPostPage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
