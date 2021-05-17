import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { useHistory } from "react-router-dom";
import Editor from "../../components/Editor";
import AuthLayout from "../../Layouts/AuthLayout";
import axios from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRequireAuth from "../../hooks/useRequireAuth";
import PostForm from "../../components/PostForm";
import { useAuth } from "../../contexts/AuthContext";

toast.configure();
const CreatePost = (props) => {
  useRequireAuth();
  const history = useHistory();
  const { state: auth } = useAuth();
  const notify = () => {
    console.log("tosted");
    toast("created :)", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const submitHandler = async (data) => {
    const res = await axios.post("/blogs", data, {
      headers: {
        Authorization: "Bearer " + auth.token, //the token is a variable which holds the token
      },
    });
    notify();
  };
  const afterSubmit = () => {
    history.push("/profile");
  };

  return (
    <AuthLayout>
      <PostForm
        formTitle="Create Awseom Post ;)"
        submitHandler={submitHandler}
        afterSubmit={afterSubmit}
      />
    </AuthLayout>
  );
};

export default CreatePost;
