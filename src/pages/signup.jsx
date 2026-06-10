import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/users/",
        form
      );

      alert("Signup Successful");

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Signup Failed"
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
        width: "420px",
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
            fontSize: "22px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 10px",
          }}
        >
          ✨
        </div>

        <h2
          style={{
            margin: 0,
            color: "#111827",
          }}
        >
          Create Account
        </h2>

        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          Sign up to get started
        </p>
      </div>

      <form onSubmit={handleSignup}>
        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
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

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
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

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
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
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
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

        {/* Role */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "18px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <option value="buyer">Buyer</option>
          <option value="vendor">Vendor</option>
        </select>

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
          Sign Up
        </button>
      </form>

      {/* Login Link */}
      <p
        style={{
          textAlign: "center",
          marginTop: "15px",
          fontSize: "14px",
          color: "#6b7280",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/"
          style={{
            color: "#6366f1",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
      </p>
    </div>
  </div>
);
}

export default Signup;