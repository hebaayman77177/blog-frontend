import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";
import UserProfileCard from "../components/UserProfileCard";
import CreatorPostCard from "../components/CreatorPostCard";

const useStyles = makeStyles((theme) => ({
  blog: {
    marginBottom: theme.spacing(2),
  },
}));
const pageSize = 20;
let page = 1;
const PostsContainer = (props) => {
  const classes = useStyles();
  const { state: auth } = useAuth();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    //get user data
    (async () => {
      const res = await axios.get(`/users/${auth.id}`, {
        headers: {
          Authorization: "Bearer " + auth.token, //the token is a variable which holds the token
        },
      });
      setUserData(res.data.data.doc);
    })();
    // get user posts
    (async () => {
      const res = await axios.get(
        `/blogs?creator--id=${auth.id}&page=${page}&limit=${pageSize}`
      );
      if (res.data.legnth === 0) {
        setHasMore(false);
      }
      const posts = res.data.data;
      setPosts(posts);
    })();
  }, []);
  const fetchMoreData = async () => {
    page += 1;
    const res = await axios.get(
      `/blogs?creator--id=${auth.id}&page=${page}&limit=${pageSize}`
    );
    if (res.data.legnth === 0) {
      setHasMore(false);
      return;
    }
    setPosts([...posts, ...res.data.data]);
  };
  return (
    <Container maxWidth="lg">
      <UserProfileCard />
      <br />
      <br />
      <Container maxWidth="md">
        <Grid container>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
            hasMore={hasMore}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {posts.map((item) => (
              <Box className={classes.blog}>
                {console.log(item)}
                <CreatorPostCard
                  key={item._id}
                  title={item.title}
                  tags={item.tags}
                  slug={item.slug}
                  id={item._id}
                />
              </Box>
            ))}
          </InfiniteScroll>
        </Grid>
      </Container>
    </Container>
  );
};

export default PostsContainer;
