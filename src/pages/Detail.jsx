import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Avatar, Button, CardActions, Grid, IconButton } from "@mui/material";
import useBlogCalls from "../hooks/useBlogCalls";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import UpdateModal from "../components/UpdateModal";
import DeleteModal from "../components/DeleteModal";
import CommentForm from "../components/CommentForm";
import { Helmet } from "react-helmet";

const Detail = () => {
  const { getBlogDataId, postBlogDataLike } = useBlogCalls();
  const { id } = useParams();
  const [showComment, setShowComment] = useState(false);
  const [blogDetail, setBlogDetail] = useState(null);
  const { currentUser, currentUserId } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [info, setInfo] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    status: "",
    slug: "",
  });
  const handleClick = async () => {
    await postBlogDataLike("likes", id);
    const response = await getBlogDataId(id);
    setBlogDetail(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBlogDataId(id);
      setBlogDetail(response);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!blogDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Helmet>
        <title>Details</title>
      </Helmet>
      <Card
        sx={{
          width: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <CardMedia
          sx={{ height: 330, objectFit: "contain", mt: 1 }}
          component="img"
          image={blogDetail.image}
          alt="image"
        />
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={blogDetail.author}
          subheader={blogDetail.publish_date.substring(0, 10)}
        />

        <CardContent sx={{ height: "auto", maxHeight: 430, overflowY: "auto" }}>
          <Typography variant="body2" color="text.secondary">
            {blogDetail.content}
          </Typography>
        </CardContent>

        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid>
            <IconButton onClick={handleClick} aria-label="add to favorites">
              <FavoriteIcon
                sx={{
                  color: `${
                    blogDetail.likes_n?.filter(
                      (like) => like.user_id === currentUserId
                    ).length > 0
                      ? "red"
                      : "gray"
                  }`,
                }}
              />
              <Typography sx={{ marginLeft: 1 }}>{blogDetail.likes}</Typography>
            </IconButton>
            <IconButton
              aria-label="comment"
              onClick={() => setShowComment(!showComment)}
            >
              <ChatOutlinedIcon />
              <Typography sx={{ marginLeft: 1 }}>
                {blogDetail.comment_count}
              </Typography>
            </IconButton>
            <IconButton aria-label="view">
              <RemoveRedEyeOutlinedIcon />
              <Typography sx={{ marginLeft: 1 }}>
                {blogDetail.post_views}
              </Typography>
            </IconButton>
          </Grid>

          {blogDetail.author === currentUser && (
            <Grid sx={{ display: "flex" }}>
              <Button
                onClick={() => {
                  const updatedInfo = { ...blogDetail };
                  if (!updatedInfo.status) {
                    updatedInfo.status = ""; // Eğer status tanımlı değilse, boş bir dizeye ayarlayın
                  }
                  const validStatusValues = ["", "draft", "published"];
                  if (!validStatusValues.includes(updatedInfo.status)) {
                    updatedInfo.status = ""; // Geçerli bir değer yoksa, boş bir değere ayarlayın
                  }
                  setInfo(updatedInfo);
                  handleOpen();
                }}
                sx={{
                  cursor: "pointer",
                  bgcolor: "green",
                  color: "white",
                  padding: "3px 12px",
                  "&:hover": { color: "black" },
                }}
              >
                UPDATE
              </Button>

              <Button
                onClick={handleOpenDelete}
                sx={{
                  cursor: "pointer",
                  bgcolor: "red",
                  color: "white",
                  padding: "3px 12px",
                  marginLeft: "1rem",
                  "&:hover": { color: "black" },
                }}
              >
                DELETE
              </Button>
            </Grid>
          )}
        </CardActions>
        {showComment && (
          <CommentForm
            setBlogDetail={setBlogDetail}
            blogDetail={blogDetail}
            id={id}
          />
        )}

        <DeleteModal
          open={openDelete}
          handleCloseDelete={handleCloseDelete}
          id={id}
        />
        <UpdateModal
          info={info}
          setInfo={setInfo}
          open={open}
          handleClose={handleClose}
          id={id}
          handleOpen={handleOpen}
        />
      </Card>
    </Grid>
  );
};

export default Detail;
