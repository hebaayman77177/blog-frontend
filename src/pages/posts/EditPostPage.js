import React, { useEffect, useState } from "react";
import "react-tagsinput/react-tagsinput.css";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import PostForm from "../../components/PostForm";
import { useParams } from "react-router-dom";
import AuthLayout from "../../Layouts/AuthLayout";
import useRequireAuth from "../../hooks/useRequireAuth";
import { useAuth } from "../../contexts/AuthContext";

const EditPostPage = (props) => {
  useRequireAuth();
  const history = useHistory();
  const { state: auth } = useAuth();
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const id = slug.split("_").pop();

  const submitHandler = async (data) => {
    const res = await axios.patch(`/blogs/${id}`, data, {
      headers: {
        Authorization: "Bearer " + auth.token, //the token is a variable which holds the token
      },
    });
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
    <AuthLayout>
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
    </AuthLayout>
  );
};

export default EditPostPage;
