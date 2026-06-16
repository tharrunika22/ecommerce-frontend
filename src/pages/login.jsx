import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try { 

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );
      localStorage.setItem(
        "refresh_token",
        response.data.refresh_token
      );
      localStorage.setItem(
        "role",
        response.data.user.role
      );
      localStorage.setItem(
        "username",
        response.data.user.username
      );
      localStorage.setItem(
        "user_id",
        response.data.user.id
      );
      

   
      alert("Login Successful");

      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail ||
        "Login Failed"
      );
    }
  };

return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f4f6",
    }}
  >
    <div
      style={{
        width: "380px",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#6366f1",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 10px",
          }}
        >
          🔐
        </div>

        <h2
          style={{
            margin: 0,
            color: "#111827",
          }}
        >
          Welcome Back
        </h2>

        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          Login to continue
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin}>
        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "14px",
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "18px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "14px",
          }}
        /> 
        <p
  style={{
    textAlign: "right",
    marginBottom: "15px",
  }}
>
  <span
    onClick={() => navigate("/forgot-password")}
    style={{
      color: "#6366f1",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    }}
  >
    Forgot Password?
  </span>
</p>

        {/* Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#4f46e5")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#6366f1")
          }
        >
          Login
        </button>
      </form>

      {/* Signup Link */}
      <p
        style={{
          textAlign: "center",
          marginTop: "15px",
          fontSize: "14px",
          color: "#6b7280",
        }}
      >
        Don't have an account?{" "}
        <Link
          to="/signup"
          style={{
            color: "#6366f1",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Sign Up
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;