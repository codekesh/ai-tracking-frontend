import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import PublicRoute from "../shared/components/PublicRoute";
import TrackingPage from "../features/auth/pages/TrackingPage";
import DietPage from "../features/auth/pages/tracking/diet/DietPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
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
        element: <TrackingPage />,
      },
      {
        path: "analytics",
        element: <div>Analytics Page</div>,
      },
    ],
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
        element: <TrackingPage />,
      },
    ],
  },
  {
    path: "tracking/diet",
    element: <DietPage />,
  },
]);
