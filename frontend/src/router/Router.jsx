import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import GuestLayout from "../layout/GuestLayout";
import ClientsLayout from "../layout/ClientsLayout ";
import AdminLayout from "../layout/AdminLayout ";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import AddProduct from "../pages/Addproduct";
import UserTable from "../pages/users";
import WelcomeMessageAdmin from "../pages/WelcomePageAdmin";
import Profile from "../pages/profileinfo";
import Contact from '../pages/Contact';
import ForgotPassword from "../pages/forgotpassword";
import Notification from "../pages/Notification";
import ResetPassword from "../pages/ResetPassword";
import ClientHome from "../pages/WelcomePageUsers";
import Reservation from "../pages/reservation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "contact", element: <Contact /> },
      { path: "password-reset/:token", element: <ResetPassword /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/app",
    element: <ClientsLayout />,
    children: [
      { path: "/app", element: <ClientHome /> },
      { path: "product", element: <Product /> },
      { path: "profileinfo", element: <Profile /> },
      { path: "contact", element: <Contact /> },
      { path: "notification", element: <Notification /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <WelcomeMessageAdmin /> },
      { path: "product", element: <Product /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "contact", element: <Contact /> },
      { path: "users", element: <UserTable /> },
      { path: "profileinfo", element: <Profile /> },
      { path: "notification", element: <Notification /> },
      { path: "reservation", element: < Reservation /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
