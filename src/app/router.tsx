import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <div>Dashboard Home</div>,
      },
      {
        path: "tracking",
        element: <div>Tracking Page</div>,
      },
      {
        path: "analytics",
        element: <div>Analytics Page</div>,
      },
    ],
  },
]);
