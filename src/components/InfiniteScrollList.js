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
const InfiniteScrollList = (props) => {
  const classes = useStyles();
  const [itmes, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${url}&page=${page}&limit=${pageSize}`);
      const resItmes = res.data.data;
      setItems(resItmes);
    })();
  }, []);
  const fetchMoreData = async () => {
    page += 1;
    const res = await axios.get(`${url}&page=${page}&limit=${pageSize}`);
    if (res.data.legnth === 0) {
      setHasMore(false);
      return;
    }
    setItems([...items, ...res.data.data]);
  };
  return (
    <Container maxWidth="md">
      <Grid container>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
          hasMore={hasMore}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {items.map((item) => (
            <Box className={classes.blog}>
              <ToRenderComponent {...item}></ToRenderComponent>
            </Box>
          ))}
        </InfiniteScroll>
      </Grid>
    </Container>
  );
};

export default InfiniteScrollList;
