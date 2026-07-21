import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
  Navigate,
} from "react-router";

import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import AuthProtected from "./AuthProtected";
import About from "../pages/About";
import Products from "../pages/Products";
import Home from "../pages/Home";
import ProductsDetail from "../pages/ProductsDetail";
import Checkout from "../pages/Checkout";

const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollRestoration />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            element: <App />,
            children: [
              { index: true, element: <Home /> },
              { path: "about", element: <About /> },
              { path: "products", element: <Products /> },
              { path: "products/:id", element: <ProductsDetail /> },
              { path: "checkout", element: <Checkout /> },
              { path: "*", element: <Navigate to="/" replace /> },
            ],
          },
        ],
      },
      {
        path: "/",
        element: <AuthProtected />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
    ],
  },
]);

const AppRoute = () => {
  return <RouterProvider router={router} />;
};

export default AppRoute;
