import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar, Box } from "@material-ui/core";
import CakeIcon from "@material-ui/icons/Cake";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  profileHeaderWraper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  mediumAvatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  profileHeaderText: {
    paddingTop: theme.spacing(1),
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  editProfileButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

export default function UserProfileCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Box className={classes.profileHeaderWraper}>
          <Button
            className={classes.editProfileButton}
            variant="outlined"
            color="primary"
          >
            Edit Brofile
          </Button>
          <Avatar
            className={classes.mediumAvatar}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
          <Typography
            className={classes.profileHeaderText}
            color="textSecondary"
            variant="p"
            gutterBottom
          >
            Heba
          </Typography>
          <Typography
            className={classes.profileHeaderText}
            color="textSecondary"
            variant="p"
            gutterBottom
          >
            <CakeIcon /> &nbsp; joined 25-05-2021
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
