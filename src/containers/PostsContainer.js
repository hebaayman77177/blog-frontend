import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "../components/PostCard";
import axios from "../axios";

const useStyles = makeStyles((theme) => ({
  blog: {
    marginBottom: theme.spacing(2),
  },
}));
const pageSize = 20;
let page = 1;
const PostsContainer = (props) => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/blogs?page=${page}&limit=${pageSize}`);
      const blogs = res.data.data;
      setBlogs(blogs);
    })();
  }, []);
  const fetchMoreData = async () => {
    page += 1;
    const res = await axios.get(`/blogs?page=${page}&limit=${pageSize}`);
    if (res.data.legnth === 0) {
      setHasMore(false);
      return;
    }
    setBlogs([...blogs, ...res.data.data]);
  };
  return (
    <Container maxWidth="lg">
      <Grid container>
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchMoreData}
          loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
          hasMore={hasMore}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
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
        </InfiniteScroll>
      </Grid>
    </Container>
  );
};

export default PostsContainer;
