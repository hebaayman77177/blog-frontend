// import React, { useState } from "react";
// import TagsInput from "react-tagsinput";
// import "react-tagsinput/react-tagsinput.css";
// import Editor from "../../components/Editor";
// import Layout from "../../Layouts/Layout";
// import axios from "../../axios";
// import Button from "@material-ui/core/Button";
// import { AuthContext } from "../../contexts/AuthContext";
// import TextField from "@material-ui/core/TextField";
// import { setSyntheticLeadingComments } from "typescript";

// const CreatePost = (props) => {
// const [post, setPost] = useState("");
// const [tags, setTags] = useState([]);
// const [title, setTitle] = useState("");
// const handleClickOutsideEditor = (post) => {
//   setPost(post);
// };
// const handleTagsChange = (tags) => {
//   setTags(tags);
// };
// const publishHandler = async () => {
//   const postData = {
//     title: "heba",
//     body: post,
//     tags: tags,
//     creator: {
//       id: "6087bb9f4efafa5384f20109",
//       name: "heba",
//   },
// };
//   const res = await axios.post("/blogs", postData);
// };
//   return (
//     <Layout>
//       <TagsInput value={tags} onChange={handleTagsChange} />
//       <TextField
//         label="Post Title"
//         variant="filled"
//         value={title}
//         onChange={(ev) => {
//           setTitle(ev.target.value);
//         }}
//       />
//       <Editor handleClickOutsideEditor={handleClickOutsideEditor} />
//       <Button variant="outlined" color="main" onClick={publishHandler}>
//         Save &amp; Publish
//       </Button>
//     </Layout>
//   );
// };

// export default CreatePost;

import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { useHistory } from "react-router-dom";
import Editor from "../../components/Editor";
import Layout from "../../Layouts/Layout";
import axios from "../../axios";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../../contexts/AuthContext";
import TextField from "@material-ui/core/TextField";
import { setSyntheticLeadingComments } from "typescript";
import PostForm from "../../components/PostForm";

const CreatePost = (props) => {
  const history = useHistory();
  const submitHandler = async (data) => {
    const res = await axios.post("/blogs", data);
  };
  const afterSubmit = () => {
    history.push("/");
  };

  return (
    <Layout>
      <PostForm
        formTitle="Create Awseom Post ;)"
        submitHandler={submitHandler}
        afterSubmit={afterSubmit}
      />
    </Layout>
  );
};

export default CreatePost;
