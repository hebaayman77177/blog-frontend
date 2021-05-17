import React from "react";
import Box from "@material-ui/core/Box";
import AppBar from "../components/AppBar";
import { Container } from "@material-ui/core";
import Footer from "../components/Footer";

const AuthLayout = ({ children }) => {
  return (
    <Box>
      <AppBar />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default AuthLayout;
