import { Outlet, Link, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: "220px",
          background: "#222",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h3>AI Platform</h3>
        <p>
          <Link to="/dashboard" style={{ color: "white" }}>
            Dashboard
          </Link>
        </p>
        <p>
          <Link to="/dashboard/tracking" style={{ color: "white" }}>
            Tracking
          </Link>
        </p>
        <p>
          <Link to="/dashboard/analytics" style={{ color: "white" }}>
            Analytics
          </Link>
        </p>
        <button onClick={logout}>Logout</button>
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
