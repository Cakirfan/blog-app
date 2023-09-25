import React from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Helmet } from "react-helmet";
import avatar from "../Assets/avatar.jpg";

const Profile = () => {
  const { currentUser, image, firstName, email, bio } = useSelector(
    (state) => state.auth
  );

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 11,
        height: "74.5vh",
      }}
    >
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Card
        sx={{
          width: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: ".5rem",
          boxShadow: "3px 9px 9px #000"
        }}
      >
        <CardMedia
          sx={{ objectFit: "contacoverin", height: "300px" }}
          component="img"
          image={image ? image : avatar}
          alt="image"
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" color="text.primary">
            {currentUser}
          </Typography>
          <Typography variant="h5" color="text.primary">
            {firstName}
          </Typography>
          <Typography variant="h5" color="text.primary">
            {email}
          </Typography>
          <Typography variant="p" color="text.primary">
            {bio}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Profile;
