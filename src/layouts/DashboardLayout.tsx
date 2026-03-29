import { Outlet } from "react-router-dom";
import LeftSideBar from "./LeftSideBar"

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <LeftSideBar />

      <main
        style={{
          flex: 1,
          marginLeft: "60px",
          padding: "20px",
          minHeight: "100vh",
          background: "#f5f7fa",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
