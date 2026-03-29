import { Outlet } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <LeftSideBar />

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
