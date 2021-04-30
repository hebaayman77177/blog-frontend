import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import _ from "lodash";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

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
    "& .MuiCardHeader-title,& .MuiCardHeader-subheader": {
      cursor: "pointer",
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

export default function PostCart({
  creator,
  title,
  timetoread,
  updatedAt,
  tags,
  numInteractions,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar
            aria-label="recipe"
            src={_.pick(creator, ["photo"])}
            className={classes.avatar}
          >
            {_.has(creator, "photo") ? null : creator["name"][0]}
          </Avatar>
        }
        title={creator.name}
        subheader={moment(updatedAt).format("d, MMMM")}
      />
      <Box className={classes.cardContent}>
        <CardContent>
          <Typography variant="h5" component="p" className={classes.cardTitle}>
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
            variant="text"
            size="medium"
            className={classes.button}
            startIcon={<FavoriteIcon />}
          >
            {numInteractions} interactions
          </Button>
          <Typography
            variant="span"
            component="span"
            className={`${classes.goRight} ${classes.remainingMinutes}`}
          >
            {timetoread} minutes
          </Typography>
          <Button
            variant="contained"
            size="medium"
            color="default"
            className={classes.saveButton}
          >
            Save
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
