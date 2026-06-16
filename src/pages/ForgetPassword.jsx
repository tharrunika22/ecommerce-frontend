import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault(); 
    if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/reset-password",
        {
          email,
          new_password: newPassword,
        }
      );

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Password reset failed"
      );
    }
  }; 
  const verifyEmail = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/auth/verify-email",
      {
        email,
      }
    );

    alert(response.data.message);
    setEmailVerified(true);
  } catch (error) {
    alert(
      error.response?.data?.detail ||
      "Email not found"
    );
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Reset Password</h2>

        <form onSubmit={handleResetPassword}>
          <input
  type="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
  }}
/>

{!emailVerified && (
  <button
    type="button"
    onClick={verifyEmail}
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      background: "#6366f1",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
    }}
  >
    Verify Email
  </button>
)}

        {emailVerified && (
  <>
    <input
      type="password"
      placeholder="New Password"
      value={newPassword}
      onChange={(e) =>
        setNewPassword(e.target.value)
      }
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "12px",
      }}
    />

    <input
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) =>
        setConfirmPassword(e.target.value)
      }
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
      }}
    />

    <button
      type="submit"
      style={{
        width: "100%",
        padding: "12px",
        background: "#6366f1",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
      }}
    >
      Change Password
    </button>
  </>
)}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;