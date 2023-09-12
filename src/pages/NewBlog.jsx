import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Formik } from "formik";
import Grid from "@mui/material/Grid";
import PostAddIcon from "@mui/icons-material/PostAdd";
import NewBlogForm, { blogSchema } from "../components/blog/NewBlogForm";
import useBlogCalls from "../hooks/useBlogCalls";
import { Helmet } from "react-helmet";
import Login from "./Login";

const NewBlog = () => {
  const { postBlogData } = useBlogCalls();
  const { currentUser } = useBlogCalls();

  return (
    <>
      {currentUser ? (
        <Grid
          sx={{
            backgroundImage:
              "url(https://media.istockphoto.com/id/184948373/photo/close-up-of-a-blog-key.jpg?b=1&s=612x612&w=0&k=20&c=6G2k4GRPQN60E9s_8snjDar14pB57vnkfMU8-S7ISiU=)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.8,
            height: "80.5vh",
            display: "flex",
            alignItems: "center",
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
              sx={{ mb: 3, fontWeight: 600 }}
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
      ) : (
        <Login />
      )}
    </>
  );
};

export default NewBlog;
