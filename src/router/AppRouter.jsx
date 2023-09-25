import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "../components/Navbar";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Detail from "../pages/Details"
import Footer from "../components/Footer";
import MyBlogs from "../pages/MyBlogs";
import NotFound from "../pages/NotFound";
// import { useSelector } from "react-redux";

const Router = () => {

  // const { currentUser } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notfound" element={<NotFound />} />

        <Route path="" element={<PrivateRouter />}>
          <Route path="/detail/:id" element={<Detail />} />
        </Route>

        <Route path="" element={<PrivateRouter />}>
          <Route path="/newblog" element={<NewBlog />} />
        </Route>

        <Route path="" element={<PrivateRouter />}>
          <Route path="/my-blogs" element={<MyBlogs />} />
        </Route>

        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
