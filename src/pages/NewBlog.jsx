import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Formik } from "formik";
import Grid from "@mui/material/Grid";
import PostAddIcon from "@mui/icons-material/PostAdd";
import NewBlogForm, { blogSchema } from "../components/blog/NewBlogForm";
import useBlogCalls from "../hooks/useBlogCalls";
import { Helmet } from "react-helmet";

const NewBlog = () => {
  const { postBlogData } = useBlogCalls();

  return (
    <>
      <Grid
        sx={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2017/05/05/22/38/blog-2288426_640.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
          height: "80.5vh",
          display: "flex",
          alignItems: "center",
          marginTop: "6.5rem",
        }}
      >
        <Helmet>
          <title>New Blog</title>
        </Helmet>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            p: 1,
            m: "auto",
            width: "400px",
            borderRadius: "10px",
            background: "#fff",
            opacity: 0.7,
            border: "2px solid blue",
            boxShadow: "10px 10px 15px #fff",
          }}
        >
          <Avatar
            sx={{
              backgroundColor: "black",
              m: "auto",
              width: 40,
              height: 40,
              mt: 2,
            }}
          >
            <PostAddIcon size="10" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            color="orangered"
            sx={{ fontWeight: 600 }}
          >
            New Blog
          </Typography>

          <Formik
            initialValues={{
              title: "",
              content: "",
              image: "",
              category: "",
              status: "",
            }}
            validationSchema={blogSchema}
            onSubmit={(values, actions) => {
              //! submit islemi oldugunda yapilacaklari buraya yaziyoruz.
              postBlogData("blogs", values);
              // console.log(values);
              actions.resetForm();
            }}
            component={(props) => <NewBlogForm {...props} />}
          ></Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default NewBlog;
