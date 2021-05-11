import React, { useState, useContext } from "react";
import TagsInput from "react-tagsinput";
import "./tags.css";
import Editor from "./Editor";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  unstyledButton: {
    background: "none",
    color: "inherit",
    border: "none",
    padding: 0,
    font: "inherit",
    cursor: "pointer",
    outline: "inherit",
  },
  title: {
    width: "100%",
    "& .MuiInputLabel-outlined": {
      display: "none",
    },
    "& fieldset span": {
      display: "none",
    },
  },
}));

const CreatePost = ({
  formTitle = "",
  initTitle = "",
  initTags = [],
  initPost = "",
  submitHandler,
  afterSubmit,
}) => {
  const classes = useStyles();
  const AuthContextState = useAuth();
  const [post, setPost] = useState(initPost);
  const [tags, setTags] = useState(initTags);
  const [title, setTitle] = useState(initTitle);
  const [postErrorMessage, setPostErrorMessage] = useState(
    "the post must not be empty"
  );
  const [postError, setPostError] = useState(false);
  const [postIsTouched, setPostIsTouched] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState(
    "the title must not be empty"
  );
  const [titleError, setTitleError] = useState(false);
  const [titleIsTouched, setTitleIsTouched] = useState(false);

  const handleClickOutsideEditor = (post) => {
    setPost(post);
  };
  const handleTagsChange = (tags) => {
    setTags(tags);
  };
  const publishHandler = async () => {
    const postData = {
      title: title,
      body: post,
      tags: tags,
      creator: {
        id: AuthContextState.id,
        name: AuthContextState.name,
      },
    };
    await submitHandler(postData);
    afterSubmit();
  };
  return (
    <Box>
      <Typography variant="h4" color="initial">
        {formTitle}
      </Typography>
      <br />
      <br />
      <TagsInput
        className={classes.tags}
        value={tags}
        onChange={handleTagsChange}
      />
      <br />
      <TextField
        className={classes.title}
        label="Post Title"
        variant="outlined"
        value={title}
        onChange={(ev) => {
          setTitle(ev.target.value);
        }}
        onBlur={() => {
          setTitleError(false);
          setTitleIsTouched(true);
          if (title.trim() === "") {
            setTitleError(true);
          }
        }}
      />
      <Typography color="error">
        {titleError && titleIsTouched ? titleErrorMessage : null}
      </Typography>
      <br />
      <button
        className={classes.unstyledButton}
        onBlur={() => {
          setPostError(false);
          setPostIsTouched(true);
          if (post.trim() === "" || post === "<p><br></p>") {
            setPostError(true);
          }
        }}
      >
        <Editor
          handleClickOutsideEditor={handleClickOutsideEditor}
          initPost={post}
        />
      </button>
      <Typography color="error">
        {postError && postIsTouched ? postErrorMessage : null}
      </Typography>
      <br />
      <Button variant="outlined" color="main" onClick={publishHandler}>
        Save &amp; Publish
      </Button>
    </Box>
  );
};

export default CreatePost;
