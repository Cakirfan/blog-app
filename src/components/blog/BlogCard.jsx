import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import useBlogCalls from "../../hooks/useBlogCalls";
import avatar from "../../Assets/avatar.jpg";

export default function BlogCard({ blog }) {
  const {
    author,
    comment_count,
    content,
    title,
    publish_date,
    image,
    likes,
    likes_n,
    id,
    post_views,
  } = blog;
  const { currentUserId, currentUser } = useSelector((state) => state.auth);
  const { postBlogDataLike } = useBlogCalls();

  const navigate = useNavigate();
  const truncatedContent =
    content.length > 180
      ? `${blog.content.substring(0, 180)}...`
      : blog.content;

  const handleMore = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleClick = async () => {
    await postBlogDataLike("likes", id);
  };

  return (
    <Card
      sx={{
        width: "400px",
        height: "450px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, " +
          "rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, " +
          "rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={currentUser ? image : avatar}
          >
            R
          </Avatar>
        }
        title={title}
        subheader={publish_date.substring(0, 10)}
      />
      <CardMedia
        sx={{ height: 130, objectFit: "contain" }}
        component="img"
        image={image}
        alt="image"
      />
      <CardContent sx={{ height: 130 }}>
        <Typography variant="body2" color="text.secondary">
          {truncatedContent}
        </Typography>
      </CardContent>
      <Grid sx={{ display: "flex", alignItems: "center", ml: 2 }}>
        <AccountCircle />
        <span>{author ?? "No author"}</span>
      </Grid>

      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography component="div">
          <IconButton
            aria-label="add to favorites"
            sx={{ textAlign: "left", alignItems: "left" }}
            onClick={handleClick}
          >
            <FavoriteIcon
              sx={{
                color: `${
                  likes_n?.filter((like) => like.user_id === currentUserId)
                    .length > 0
                    ? "red"
                    : "gray"
                }`,
              }}
            />
            <span>{likes ?? "0"}</span>
          </IconButton>

          <IconButton
            onClick={() => handleMore(id)}
            aria-label="add to favorites"
            sx={{ textAlign: "left", alignItems: "left" }}
          >
            <ChatBubbleOutlineOutlinedIcon />
            <span>{comment_count ?? "0"}</span>
          </IconButton>
          <IconButton aria-label="view">
            <RemoveRedEyeOutlinedIcon />
            <span>{post_views}</span>
          </IconButton>
        </Typography>

        <Grid>
          <Button
            onClick={() => handleMore(id)}
            sx={{
              cursor: "pointer",
              bgcolor: "orange",
              "&:hover": { backgroundColor: "darkgreen", color: "white" },
            }}
          >
            READ MORE
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
