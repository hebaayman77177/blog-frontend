import React, { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import PostForm from "../../components/PostForm";
import Box from "@material-ui/core/Box";
import { useParams } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import useRequireAuth from "../../hooks/useRequireAuth";

const EditPostPage = (props) => {
  useRequireAuth();
  const history = useHistory();
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const submitHandler = async (data) => {
    const res = await axios.patch(`/blogs/${id}`, data);
  };

  const afterSubmit = () => {
    history.push("/");
  };

  useEffect(() => {
    axios.get(`/blogs/${id}`).then((res) => {
      setPost(res.data.data.doc);
    });
  }, []);

  return (
    <Layout>
      {post !== null ? (
        <PostForm
          formTitle="(: Update Your Post :)"
          initTitle={post.title}
          initTags={post.tags}
          initPost={post.body}
          submitHandler={submitHandler}
          afterSubmit={afterSubmit}
        />
      ) : null}
    </Layout>
  );
};

export default EditPostPage;
