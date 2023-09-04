import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { Helmet } from "react-helmet";

const MyBlogs = () => {
  const { blogs } = useSelector((state) => state.blog);
  const { getBlogDataDraft } = useBlogCalls();

  useEffect(() => {
    getBlogDataDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>My Blogs</title>
      </Helmet>
      <Container
        sx={{ minHeight: "90vh", marginTop: "7rem", marginBottom: "8rem" }}
      >
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 3 }}
        >
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MyBlogs;
