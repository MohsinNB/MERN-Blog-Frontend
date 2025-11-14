import React, { Children } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "../src/components/ui/sonner";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/Profile/Profile";
import YourBlogs from "./pages/YourBlogs";
import Comments from "./pages/Comments";
import CreateBlogs from "./pages/CreateBlogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home></Home>
      </>
    ),
  },
  {
    path: "/blogs",
    element: (
      <>
        <Navbar />
        <Blogs />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Navbar />
        <About />
      </>
    ),
  },

  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },

  {
    path: "/Signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Navbar />
        <Dashboard />
      </>
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "your-blogs",
        element: <YourBlogs />,
      },
      {
        path: "comments",
        element: <Comments />,
      },
      {
        path: "create-blog",
        element: <CreateBlogs />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
