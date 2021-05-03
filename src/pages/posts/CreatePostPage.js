import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Editor from "../../components/Editor";
import Layout from "../../Layouts/Layout";

const CreatePost = (props) => {
  const [post, setPost] = useState("");
  const [tags, setTags] = useState([]);
  const handleChange = (post) => {
    setPost(post);
  };
  console.log(
    "🚀 ~ file: CreatePostPage.js ~ line 8 ~ handleChange ~ post",
    post
  );
  const handleTagsChange = (tags) => {
  console.log("🚀 ~ file: CreatePostPage.js ~ line 18 ~ handleTagsChange ~ tags", tags)
    setTags(tags);
  };
  return (
    <Layout>
      <TagsInput value={tags} onChange={handleTagsChange} />
      <Editor handleChange={handleChange} />
    </Layout>
  );
};

export default CreatePost;
