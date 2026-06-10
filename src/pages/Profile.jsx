import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userId = localStorage.getItem("user_id");

    const response = await axios.get(
      `http://127.0.0.1:8000/users/${userId}`
    );

    setForm({
      username: response.data.username,
      email: response.data.email,
      phone: response.data.phone,
      password: "",
    });
  };

  const handleUpdate = async () => {
    const userId = localStorage.getItem("user_id");

    await axios.put(
      `http://127.0.0.1:8000/users/${userId}`,
      form
    );

    localStorage.setItem(
      "username",
      form.username
    );

    alert("Profile Updated Successfully");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              backgroundColor: "#6366f1",
              color: "white",
              fontSize: "32px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px",
            }}
          >
            {form.username
              ? form.username.charAt(0).toUpperCase()
              : "U"}
          </div>

          <h2
            style={{
              margin: 0,
              color: "#111827",
            }}
          >
            My Profile
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginTop: "8px",
            }}
          >
            Manage your account information
          </p>
        </div>

        {/* Username */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Username
          </label>

          <input
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
            placeholder="Enter username"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Email
          </label>

          <input
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            placeholder="Enter email"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Phone
          </label>

          <input
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            placeholder="Enter phone number"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "30px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            New Password
          </label>

          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            placeholder="Enter new password"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleUpdate}
          style={{
            width: "100%",
            backgroundColor: "#6366f1",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;