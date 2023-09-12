import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import useBlogCalls from "../../hooks/useBlogCalls";

const CommentFormWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  maxHeight: "300px",
  overflowY: "auto",
}));

const CommentForm = ({ setBlogDetail, blogDetail, id }) => {
  const { postBlogData, getBlogDataId } = useBlogCalls();
  const [commentData, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      post: id,
      content: commentData,
    };

    try {
      await postBlogData("comments", data, id);
      const response = await getBlogDataId(id);
      setBlogDetail(response);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommentFormWrapper>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {blogDetail.comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={comment.user}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline", mr: 2 }}
                      component="span"
                      variant="body4"
                      color="text.secondary"
                    >
                      {new Date(comment.time_stamp).toUTCString().slice(0, 16)}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body1"
                      color="text.primary"
                    >
                      {comment.content}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="middle" component="li" />
          </React.Fragment>
        ))}
      </List>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 3.8,
            p: 2,
          }}
        >
          <TextField
            label="Comment"
            name="content"
            id="content"
            type="text"
            variant="outlined"
            color="success"
            multiline
            value={commentData}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            placeholder="Add a comment"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              color: "black",
              bgcolor: "darkgray",
              "&:hover": { bgcolor: "secondary.main", color: "white" },
            }}
          >
            Add Comment
          </Button>
        </Box>
      </form>
    </CommentFormWrapper>
  );
};

export default CommentForm;
