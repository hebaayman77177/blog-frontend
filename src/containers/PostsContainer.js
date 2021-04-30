import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import PostCard from "../components/PostCard";
import axios from "../axios";

const useStyles = makeStyles((theme) => ({
  blog: {
    marginBottom: theme.spacing(2),
  },
}));

const PostsContainer = (props) => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get("/blogs");
      const blogs = res.data.data;
      setBlogs(blogs);
      console.log("🚀 ~ file: PostsContainer.js ~ line 15 ~ blogs", blogs);
    })();
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container>
        {blogs.map((item) => (
          <Box className={classes.blog}>
            <PostCard
              key={item._id}
              title={item.title}
              creator={item.creator}
              updatedAt={item.updatedAt}
              tags={item.tags}
              numInteractions={item.numInteractions}
            />
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

export default PostsContainer;
