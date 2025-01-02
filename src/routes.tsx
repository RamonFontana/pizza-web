import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { SingIn } from "./pages/auth/sing-in";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { SingUp } from "./pages/auth/sing-up";
import { Orders } from "./pages/app/orders/orders";
import { NotFound } from "./pages/404";
import { Error } from "./pages/error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Dashboard /> },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SingIn /> },
      { path: "/sign-up", element: <SingUp /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
