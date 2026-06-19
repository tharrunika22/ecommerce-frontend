import { useEffect, useState } from "react";
import {
  MapPin,
  Plus,
  User,
  Phone,
  Home,
} from "lucide-react";

function Address() {
  const [addresses, setAddresses] = useState([]);
  const [showAddressPopup, setShowAddressPopup] =
    useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8000/address/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8000/address/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        setShowAddressPopup(false);

        setForm({
          full_name: "",
          phone: "",
          address_line: "",
          city: "",
          state: "",
          pincode: "",
        });

        fetchAddresses();
      } else {
        alert("Failed to add address");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "30px",
            color: "#111827",
            fontWeight: "700",
          }}
        >
          Address Management
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#6b7280",
          }}
        >
          Manage your delivery locations
        </p>
      </div>

      {/* Stats + Add Button */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(to right,#6366f1,#4f46e5)",
            color: "white",
            borderRadius: "20px",
            padding: "24px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <MapPin size={30} />

          <h2
            style={{
              margin: "12px 0 6px",
              fontSize: "32px",
            }}
          >
            {addresses.length}
          </h2>

          <p
            style={{
              margin: 0,
              opacity: 0.9,
            }}
          >
            Saved Addresses
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() =>
              setShowAddressPopup(true)
            }
            style={{
              width: "100%",
              height: "100%",
              minHeight: "120px",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              background:
                "linear-gradient(to right,#8b5cf6,#7c3aed)",
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              boxShadow:
                "0 10px 25px rgba(124,58,237,0.3)",
            }}
          >
            <Plus size={24} />
            Add New Address
          </button>
        </div>
      </div>

      {/* Address List */}
      {addresses.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "50px",
            borderRadius: "20px",
            textAlign: "center",
            color: "#6b7280",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.06)",
          }}
        >
          <MapPin
            size={60}
            color="#9ca3af"
          />

          <h3>No Addresses Found</h3>

          <p>
            Add your first delivery address.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(350px,1fr))",
            gap: "20px",
          }}
        >
          {addresses.map((address) => (
            <div
              key={address.id}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "22px",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.06)",
                border:
                  "1px solid rgba(229,231,235,0.8)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    backgroundColor:
                      "#ede9fe",
                    color: "#7c3aed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <User size={20} />
                </div>

                <div>
                  <strong
                    style={{
                      color: "#111827",
                    }}
                  >
                    {address.full_name}
                  </strong>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "#4b5563",
                  }}
                >
                  <Phone size={16} />
                  {address.phone}
                </p>

                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    gap: "10px",
                    color: "#4b5563",
                    lineHeight: "1.6",
                  }}
                >
                  <Home
                    size={16}
                    style={{
                      marginTop: "4px",
                    }}
                  />
                  {address.address_line}
                </p>

                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                  }}
                >
                  {address.city},{" "}
                  {address.state}
                </p>

                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                    fontWeight: "600",
                  }}
                >
                  PIN: {address.pincode}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popup */}
      {showAddressPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "550px",
              maxWidth: "90%",
              background: "white",
              borderRadius: "24px",
              padding: "30px",
              boxShadow:
                "0 15px 35px rgba(0,0,0,0.2)",
            }}
          >
            <h2
              style={{
                marginBottom: "25px",
                color: "#111827",
              }}
            >
              Add Delivery Address
            </h2>

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
            />

            <textarea
              rows="3"
              name="address_line"
              placeholder="Address Line"
              value={form.address_line}
              onChange={handleChange}
              style={{
                ...inputStyle,
                resize: "none",
              }}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              style={inputStyle}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() =>
                  setShowAddressPopup(false)
                }
                style={{
                  padding: "12px 18px",
                  border:
                    "1px solid #d1d5db",
                  borderRadius: "10px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={saveAddress}
                style={{
                  padding: "12px 18px",
                  border: "none",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(to right,#8b5cf6,#7c3aed)",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow:
                    "0 8px 20px rgba(124,58,237,0.3)",
                }}
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Address;