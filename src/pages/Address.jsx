import { useEffect, useState } from "react";

function Address() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchAddresses();
  }, []); 
   
  const [showAddressPopup, setShowAddressPopup] = useState(false);

const [form, setForm] = useState({
  full_name: "",
  phone: "",
  address_line: "",
  city: "",
  state: "",
  pincode: "",
});
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};
const saveAddress = async () => {
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
};

  const fetchAddresses = async () => {
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
  }; 
  const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  boxSizing: "border-box",
};

  return (
  <div>
    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h2
    style={{
      margin: 0,
      color: "#111827",
    }}
  >
    📍 My Addresses
  </h2>

  <button
    onClick={() => setShowAddressPopup(true)}
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      border: "none",
      backgroundColor: "#ddd6fe",
      color: "#5b21b6",
      fontSize: "24px",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    +
  </button>
</div>

    {addresses.length === 0 ? (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          color: "#6b7280",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        No addresses added yet.
      </div>
    ) : (
      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        {addresses.map((address) => (
          <div
            key={address.id}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3
              style={{
                marginBottom: "10px",
                color: "#1f2937",
              }}
            >
              {address.full_name}
            </h3>

            <p>{address.phone}</p>

            <p>{address.address_line}</p>

            <p>
              {address.city}, {address.state}
            </p>

            <p>{address.pincode}</p>
          </div>
        ))}
      </div>
    )} 
    {showAddressPopup && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
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
        width: "500px",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#111827",
        }}
      >
        Add New Address
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
        name="address_line"
        placeholder="Address Line"
        value={form.address_line}
        onChange={handleChange}
        rows="3"
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
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setShowAddressPopup(false)}
          style={{
            padding: "10px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={saveAddress}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#8b5cf6",
            color: "#fff",
            cursor: "pointer",
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