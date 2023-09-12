import * as React from "react";
import { useState } from "react";
import useBlogCall from "../../hooks/useBlogCalls";
import { useSelector } from "react-redux";
import { Form } from "formik";
import { object, string } from "yup";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";

export const blogSchema = object({
  title: string()
    .max(100, "Title must be less than 100 characters")
    .required("This field is required"),
  content: string().required("This field is required"),
  image: string().max(400, "URL must be less than 400 characters"),
  category: string(),
  status: string(),
});

const NewBlogForm = ({ values, handleChange, errors, touched, handleBlur }) => {
  const { getBlogData } = useBlogCall();
  const { categories } = useSelector((state) => state.blog);
  // console.log(categories);

  useEffect(() => {
    getBlogData("categories");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [selectedStatus, setSelectedStatus] = useState(
    values.status === "d" ? "draft" : "published"
  );

  useEffect(() => {
    const newStatusValue = selectedStatus === "draft" ? "d" : "p";
    handleChange({
      target: {
        name: "status",
        value: newStatusValue,
      },
    });
  }, [selectedStatus, handleChange]);

  return (
    <div>
      <Form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.3,
            width: "350px",
            maxHeight: "680px",
            padding: "1rem 0",
          }}
        >
          <TextField
            label="Titel"
            name="title"
            id="title"
            type="text"
            variant="outlined"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.title && errors.title}
            error={touched.title && Boolean(errors.title)}
          />
          <TextField
            label="Image"
            name="image"
            id="image"
            type="url"
            variant="outlined"
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.image && errors.image}
            error={touched.image && Boolean(errors.image)}
          />
          <FormControl
            variant="outlined"
            error={touched.category && Boolean(errors.category)}
            fullWidth
          >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Category"
              helperText={touched.category && errors.category}
              error={touched.category && Boolean(errors.category)}
            >
              <MenuItem value="">Select a category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {touched.category && errors.category && (
              <span>{errors.category}</span>
            )}
          </FormControl>
          <FormControl
            variant="outlined"
            error={touched.status && Boolean(errors.status)}
            fullWidth
          >
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={selectedStatus} // Always use "draft" or "published" as the value
              onChange={(e) => setSelectedStatus(e.target.value)}
              onBlur={handleBlur}
              label="Status"
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </Select>

            {touched.status && errors.status && <span>{errors.status}</span>}
          </FormControl>
          <TextField
            aria-label="Content"
            placeholder="Content"
            name="content"
            id="content"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.content && Boolean(errors.content)}
            helperText={touched.content && errors.content}
            multiline
            rows={4}
            sx={{
              width: "100%",
              resize: "vertical",
              borderRadius: "4px",
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
          />

          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Box>
      </Form>
    </div>
  );
};

export default NewBlogForm;
