import React, { useEffect, useState } from "react";
import axios from "axios";

function VendorProfile() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const [showEditPopup, setShowEditPopup] = useState(false);

  const [showPasswordPopup, setShowPasswordPopup] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    marginBottom: "12px",
  };

  useEffect(() => {
    fetchVendor();
  }, []);

  async function fetchVendor() {
    const userId = localStorage.getItem("user_id");

    if (!userId) return;

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/users/${userId}`
      );

      setForm({
        username: res.data.username || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
      });

      setProfileImage(
        res.data.profile_image || null
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate() {
    const userId = localStorage.getItem("user_id");

    const token = localStorage.getItem("token");

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

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  }

  async function handleChangePassword() {
    const token = localStorage.getItem("token");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      alert("Fill all password fields");
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
      alert(
        err.response?.data?.detail ||
          "Password update failed"
      );
    }
  }

  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
        }}
      >
        {/* Profile Card */}

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 20,
            boxShadow:
              "0 16px 40px rgba(15, 23, 42, 0.08)",
            padding: 24,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                }}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Vendor"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border:
                        "3px solid #ddd6fe",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      backgroundColor:
                        "#6366f1",
                      color: "white",
                      fontSize: 40,
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent:
                        "center",
                      alignItems: "center",
                    }}
                  >
                    {form.username
                      ?.charAt(0)
                      ?.toUpperCase() || "V"}
                  </div>
                )}

                <h2
                  style={{
                    marginTop: 16,
                    color: "#1e293b",
                  }}
                >
                  {form.username}
                </h2>

                <span
                  style={{
                    display: "inline-block",
                    marginTop: 8,
                    backgroundColor:
                      "#eef2ff",
                    color: "#4f46e5",
                    padding:
                      "6px 16px",
                    borderRadius: 20,
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Vendor
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                setShowEditPopup(true)
              }
              style={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                backgroundColor:
                  "#ffffff",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              ✏️
            </button>
          </div>
        </div>

        {/* Personal Information */}

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: 20,
            borderRadius: 16,
            boxShadow:
              "0 8px 24px rgba(15, 23, 42, 0.08)",
            marginBottom: 20,
          }}
        >
          <h3
            style={{
              marginBottom: 20,
              color: "#1e293b",
            }}
          >
            Personal Information
          </h3>

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontWeight: 600,
              }}
            >
              Username
            </label>

            <div
              style={{
                padding: 12,
                backgroundColor:
                  "#f9fafb",
                borderRadius: 10,
                marginTop: 8,
              }}
            >
              {form.username}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontWeight: 600,
              }}
            >
              Email
            </label>

            <div
              style={{
                padding: 12,
                backgroundColor:
                  "#f9fafb",
                borderRadius: 10,
                marginTop: 8,
              }}
            >
              {form.email}
            </div>
          </div>

          <div>
            <label
              style={{
                fontWeight: 600,
              }}
            >
              Phone
            </label>

            <div
              style={{
                padding: 12,
                backgroundColor:
                  "#f9fafb",
                borderRadius: 10,
                marginTop: 8,
              }}
            >
              {form.phone || "N/A"}
            </div>
          </div>
        </div>

        {/* Account Information */}

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: 20,
            borderRadius: 16,
            boxShadow:
              "0 8px 24px rgba(15, 23, 42, 0.08)",
          }}
        >
          <h3
            style={{
              marginBottom: 20,
              color: "#1e293b",
            }}
          >
            Account Information
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginBottom: 15,
            }}
          >
            <span>Account Type</span>
            <span
              style={{
                color: "#4f46e5",
                fontWeight: 600,
              }}
            >
              Vendor
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginBottom: 15,
            }}
          >
            <span>Status</span>
            <span
              style={{
                color: "#16a34a",
                fontWeight: 600,
              }}
            >
              Active
            </span>
          </div>

          <button
            onClick={() =>
              setShowPasswordPopup(true)
            }
            style={{
              width: "100%",
              marginTop: 20,
              padding: 12,
              backgroundColor:
                "#6366f1",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Change Password
          </button>
        </div>

        {/* Edit Profile Popup */}
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
        

        {/* Change Password Popup */}
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

export default VendorProfile;