import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { useConfirm } from "material-ui-confirm";
import FavoriteIcon from "@material-ui/icons/Favorite";
import _ from "lodash";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import axios from "../axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardHeader: {
    cursor: "pointer",
    "& .MuiCardHeader-title,& .MuiCardHeader-subheader": {
      color: theme.palette.text.secondary,
      fontWeight: 600,
      "&:hover": {
        color: theme.palette.text.primary,
      },
    },
  },
  cardContent: {
    margin: theme.spacing(3),
  },
  cardTitle: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
    fontWeight: 800,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  tag: {
    cursor: "pointer",
    fontSize: 17,
    color: theme.palette.text.secondary,
    "& span": {
      color: theme.palette.text.disabled,
    },
    "&:hover": {
      color: theme.palette.text.primary,
      "& span": {
        color: theme.palette.text.primary,
      },
    },
  },
  goRight: {
    marginLeft: "auto",
  },
  remainingMinutes: {
    color: theme.palette.text.secondary,
  },
  saveButton: {
    marginLeft: theme.spacing(1),
  },
}));

export default function CreatorPostCard({ title, tags, slug, id }) {
  const classes = useStyles();
  const history = useHistory();
  const confirm = useConfirm();
  const { state: auth } = useAuth();

  const showPostHandler = useCallback(() => {
    history.push(`/show-post/${slug}`);
  }, []);
  const editPostHandler = useCallback(() => {
    console.log("edit");
    history.push(`/edit-post/${slug}`);
  }, []);
  const deletePostHandler = useCallback(() => {
    console.log("deletePost");
    confirm({ description: "Really want to delete the post :(" })
      .then(async () => {
        const res = await axios.delete(`/blogs/${id}`, {
          headers: {
            Authorization: "Bearer " + auth.token, //the token is a variable which holds the token
          },
        });        
      })
      .catch(() => {});
  }, []);
  return (
    <Card className={classes.root}>
      <Box className={classes.cardContent}>
        <CardContent>
          <Typography
            onClick={showPostHandler}
            variant="h5"
            component="p"
            className={classes.cardTitle}
          >
            {title}
          </Typography>
          <Typography variant="p" color="textSecondary" component="p">
            {tags.map((tag) => (
              <Typography
                key={tag}
                variant="p"
                color="textSecondary"
                component="span"
                className={classes.tag}
              >
                <span variant="span" component="span">
                  #
                </span>
                {tag}&nbsp;
              </Typography>
            ))}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="outlined"
            size="medium"
            color="secondary"
            className={classes.goRight}
            onClick={editPostHandler}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            className={classes.saveButton}
            onClick={deletePostHandler}
          >
            Delete
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
