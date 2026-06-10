import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  return (
  <>
    <Navbar />

    <div
      style={{
        display: "flex",
        minHeight: "calc(100vh - 70px)",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        {/* Welcome Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#111827",
            }}
          >
            👋 Hi, {role}
          </h2>

          <p
            style={{
              marginTop: "10px",
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            Welcome back, <strong>{username}</strong>
          </p>
        </div>

        {/* Page Content */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            minHeight: "500px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  </>
);
}

export default Dashboard;