import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Formik } from "formik";
import Grid from "@mui/material/Grid";
import PostAddIcon from "@mui/icons-material/PostAdd";
import NewBlogForm, { blogSchema } from "../components/NewBlogForm";
import useBlogCalls from "../hooks/useBlogCalls";
import { Helmet } from "react-helmet";

const NewBlog = () => {
  const { postBlogData } = useBlogCalls();

  return (
    <Grid
      sx={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity: 0.8,
        height: "77vh",
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
          backgroundColor: "lightgray",
          borderRadius: "10px",
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
        <Typography variant="h4" align="center" color="black" sx={{ mb: 3 }}>
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
            console.log(values);
            actions.resetForm();
          }}
          component={(props) => <NewBlogForm {...props} />}
        ></Formik>
      </Grid>
    </Grid>
  );
};

export default NewBlog;
