import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { Grid } from "@mui/material";
// import { flexCenter } from "../styles/globalStyle";
import BlogCard from "../components/blog/BlogCard";
import { Helmet } from "react-helmet";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Dashboard = () => {
  const { getBlogDataPublic } = useBlogCalls();
  const { blogs } = useSelector((state) => state.blog);
  const [scrollToTop, setScrollToTop] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getBlogDataPublic("blogs");
    console.log(blogs);

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          mt: "7rem",
        }}
      >
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        {blogs?.map((blog) => (
          <Grid sx={{ mt: 3, mb: 3 }} item key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
      {scrollToTop && (
        <button
          onClick={handleScrollToTop}
          style={{
            position: "fixed",
            bottom: "15px",
            right: "12px",
            padding: "7px",
            fontSize: "16px",
            backgroundColor: "lightgray",
            borderRadius: "5px",
          }}
        >
          <ArrowUpwardIcon />
        </button>
      )}
    </div>
  );
};

export default Dashboard;
