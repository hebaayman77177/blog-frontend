import React from "react";
import PostsContainer from "../containers/PostsContainer";
import Layout from "../Layouts/Layout";
const HomePage = (props) => {
  return (
    <Layout>
      <PostsContainer />
    </Layout>
  );
};

export default HomePage;
