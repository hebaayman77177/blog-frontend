import React, { useEffect, useState } from "react";
import "react-tagsinput/react-tagsinput.css";
import axios from "../../axios";
import Box from "@material-ui/core/Box";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ReactHtmlParser from "react-html-parser";
import { makeStyles } from "@material-ui/core/styles";

import AuthLayout from "../../Layouts/AuthLayout";

const useStyles = makeStyles((theme) => ({
  root: {
    // textAlign: "center",
    //   display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center",
    "& img": {
      maxWidth: "75%",
      maxHeight: "700px",
    },
  },
}));

const ShowPostPage = (props) => {
  const classes = useStyles();
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const id = slug.split("_").pop();

  useEffect(() => {
    axios.get(`/blogs/${id}`).then((res) => {
      setPost(res.data.data.doc);
      console.log(
        "🚀 ~ file: ShowPostPage.js ~ line 73 ~ axios.get ~ res.data.data.doc",
        res.data.data.doc.tags
      );
    });
  }, []);
  return (
    <AuthLayout>
      {post === null ? null : (
        <Box className={classes.root}>
          <Typography variant="h3" color="initial">
            {post.title}
          </Typography>
          <Typography variant="p" color="initial">
            {post.tags.map((tag, index) => {
              <span key={index}>#{tag}</span>;
            })}
          </Typography>
          <hr />
          <Typography variant="p" color="initial">
            {ReactHtmlParser(post.body)}
          </Typography>
        </Box>
      )}
    </AuthLayout>
  );
};

export default ShowPostPage;
