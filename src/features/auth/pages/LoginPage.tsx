import { useState } from "react";
import { authAPI } from "../../../shared/api/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
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
      alert("Login Failed");
    }
  };

  return (
    <>
      <div>
        <h2>Login</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </>
  );
}
