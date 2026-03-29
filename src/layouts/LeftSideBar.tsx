import { Link, useNavigate } from "react-router-dom";
import "./LeftSideBar.css";

export default function LeftSideBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="area"></div>

      <nav className="main-menu">
        <ul>
          <li>
            <Link to="/dashboard">
              <i className="fa fa-home fa-2x"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>

          <li className="has-subnav">
            <Link to="/dashboard/tracking">
              <i className="fa fa-globe fa-2x"></i>
              <span className="nav-text">Tracking</span>
            </Link>
          </li>

          <li className="has-subnav">
            <Link to="/dashboard/analytics">
              <i className="fa fa-comments fa-2x"></i>
              <span className="nav-text">Analytics</span>
            </Link>
          </li>
        </ul>

        <ul className="logout">
          <li>
            <button className="logout-btn" onClick={logout}>
              <i className="fa fa-power-off fa-2x"></i>
              <span className="nav-text">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
