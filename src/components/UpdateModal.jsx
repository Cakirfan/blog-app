import * as React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Modal,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateModal({
  info,
  setInfo,
  open,
  handleClose,
  handleOpen,
  id,
}) {
  const { categories } = useSelector((state) => state.blog);
  const { getBlogData, putBlogData } = useBlogCalls();

  useEffect(() => {
    getBlogData("categories");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    // console.log(e.target.name);
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    putBlogData("blogs", info);
    setInfo({
      title: "",
      content: "",
      image: "",
      category: "",
      status: "",
      slug: "",
    });
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          setInfo({
            title: "",
            content: "",
            image: "",
            category: "",
            status: "",
            slug: "",
          });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            component={"form"}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Blog Title"
              name="title"
              id="title"
              type="text"
              value={info?.title}
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              label="Content"
              name="content"
              id="content"
              type="text"
              value={info?.content}
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              value={info?.image}
              variant="outlined"
              onChange={handleChange}
              required
            />

            <FormControl variant="outlined" fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={info?.category}
                onChange={handleChange}
                label="Category"
                required
              >
                <MenuItem value="">Select a category</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={
                  info?.status === "d"
                    ? "draft"
                    : info?.status === "p"
                    ? "published"
                    : ""
                }
                onChange={(e) => {
                  const selectedStatus = e.target.value;
                  const newStatusValue =
                    selectedStatus === "draft"
                      ? "d"
                      : selectedStatus === "published"
                      ? "p"
                      : "";
                  setInfo((prevState) => ({
                    ...prevState,
                    status: newStatusValue,
                  }));
                }}
                label="Status"
                required
              >
                <MenuItem value="">Select a status</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" type="submit">
              SUBMIT
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
