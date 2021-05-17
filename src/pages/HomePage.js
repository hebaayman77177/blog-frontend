import React from "react";
import PostsContainer from "../containers/PostsContainer";
import AuthLayout from "../Layouts/AuthLayout";
const HomePage = (props) => {
  return (
    <AuthLayout>
      <PostsContainer />
    </AuthLayout>
  );
};

export default HomePage;
