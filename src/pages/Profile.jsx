import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [form, setForm] = useState({ username: "", email: "", phone: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    marginBottom: "12px",
  };

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;
    try {
      const res = await axios.get(`http://127.0.0.1:8000/users/${userId}`);
      setForm({
        username: res.data.username || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
      });
      setProfileImage(res.data.profile_image || null);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  }

  async function handleUpdate() {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    if (!userId) return;
    try {
      await axios.put(
        `http://127.0.0.1:8000/users/${userId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    }
  }

  async function handleChangePassword() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to change your password.");
      return;
    }
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/auth/change-password",
        {
          old_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordPopup(false);
    } catch (err) {
      console.error("Change password failed:", err.response?.data || err);
      alert(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Password update failed"
      );
    }
  }

  return (
    <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 20,
            boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
            padding: 24,
            marginBottom: 24,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid #ddd6fe",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      backgroundColor: "#8b5cf6",
                      color: "white",
                      fontSize: "40px",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "0 auto",
                    }}
                  >
                    {form.username?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}

                <h2 style={{ marginTop: 16, color: "#1e293b" }}>{form.username}</h2>
              </div>
            </div>

            <button
              onClick={() => setShowEditPopup(true)}
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#fff",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                fontSize: "18px",
              }}
              aria-label="Edit profile"
            >
              ✏️
            </button>
          </div>
        </div>

        <div style={{ width: "100%", backgroundColor: "#ffffff", padding: 20, borderRadius: 16, boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)" }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600 }}>Username</label>
          <div
            style={{
              padding: 12,
              backgroundColor: "#f9fafb",
              borderRadius: 10,
              marginTop: 8,
            }}
          >
            {form.username}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600 }}>Email</label>
          <div
            style={{
              padding: 12,
              backgroundColor: "#f9fafb",
              borderRadius: 10,
              marginTop: 8,
            }}
          >
            {form.email}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600 }}>Phone</label>
          <div
            style={{
              padding: 12,
              backgroundColor: "#f9fafb",
              borderRadius: 10,
              marginTop: 8,
            }}
          >
            {form.phone}
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: "420px", margin: "30px auto", display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setShowPasswordPopup(true)}
            style={{
              width: "100%",
              padding: "12px",
              background: "#6366f1",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Change Password
          </button>
        </div>
      </div>

        {showEditPopup && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: 25,
                width: 450,
                borderRadius: 12,
              }}
            >
              <h2>Edit Profile</h2>

              <input
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Username"
                style={inputStyle}
              />

              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                style={inputStyle}
              />

              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone"
                style={inputStyle}
              />

              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button onClick={() => setShowEditPopup(false)} style={{ flex: 1, padding: 10 }}>
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    await handleUpdate();
                    await fetchUser();
                    setShowEditPopup(false);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#6366f1",
                    color: "white",
                    border: "none",
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {showPasswordPopup && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: 25,
                width: 400,
                borderRadius: 12,
              }}
            >
              <h2>Change Password</h2>

              <input
  type="password"
  placeholder="Current Password"
  value={currentPassword}
  onChange={(e) => setCurrentPassword(e.target.value)}
  style={{
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    marginBottom: 12,
  }}
/>

<input
  type="password"
  placeholder="New Password"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
  style={{
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    marginBottom: 12,
  }}
/>

<input
  type="password"
  placeholder="Confirm New Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  style={{
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    marginBottom: 20,
  }}
/>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setShowPasswordPopup(false)}>Cancel</button>

                <button
                  onClick={handleChangePassword}
                  style={{
                    backgroundColor: "#6366f1",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;