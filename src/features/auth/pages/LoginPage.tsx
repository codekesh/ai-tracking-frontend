import { useState, type SubmitEvent } from "react";
import { authAPI } from "../../../shared/api/axios";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await authAPI.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrorMsg("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-heading">Sign In</div>
        <div className="auth-subtitle">
          Welcome back to your AI Tracking Platform
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            required
            className="auth-input"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            required
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="#" className="auth-helper">
            Forgot Password?
          </Link>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        <div className="auth-footer">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </div>

        <div className="auth-brand">AI Tracking Platform</div>
      </div>
    </div>
  );
}
