import { useState } from "react";
import { authAPI } from "../../../shared/api/axios";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPage.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");
    setLoading(true);

    try {
      await authAPI.post("/auth/register", {
        email,
        password,
      });

      setMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error(err);
      setErrorMsg("Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-heading">Sign Up</div>
        <div className="auth-subtitle">
          Create your account to start tracking
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
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

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {errorMsg && <div className="auth-error">{errorMsg}</div>}
        {message && <div className="auth-success">{message}</div>}

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>

        <div className="auth-brand">AI Tracking Platform</div>
      </div>
    </div>
  );
}
