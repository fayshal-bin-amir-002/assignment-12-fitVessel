import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ErrorPage from "../components/shared/ErrorPage/ErrorPage";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import AllTrainer from "../pages/AllTrainer/AllTrainer";
import AllClasses from "../pages/AllClasses/AllClasses";
import DashBoard from "../layouts/DashBoard";
import Profile from "../pages/Profile/Profile";
import PrivetRoute from "./PrivetRoute";
import TrainerDetails from "../pages/TrainerDetails/TrainerDetails";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/blog/:id",
        loader: ({params}) => fetch(`http://localhost:3000/blog/${params.id}`),
        element: <BlogDetails></BlogDetails>
      },
      {
        path: "/all-trainer",
        element: <AllTrainer></AllTrainer>
      },
      {
        path: "/all-classes",
        element: <AllClasses></AllClasses>
      },
      {
        path: "/profile",
        element: <PrivetRoute><Profile></Profile></PrivetRoute>
      },
      {
        path: "/trainer-details/:id",
        loader: ({params}) => fetch(`http://localhost:3000/trainer-details/${params.id}`),
        element: <TrainerDetails></TrainerDetails>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashBoard></DashBoard>
  }
]);

export default router;