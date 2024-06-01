import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ErrorPage from "../components/shared/ErrorPage/ErrorPage";
import BlogDetails from "../pages/BlogDetails/BlogDetails";

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
      }
    ]
  },
]);

export default router;