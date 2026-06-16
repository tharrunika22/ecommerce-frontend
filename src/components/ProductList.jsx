import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function ProductList() {
  const [products, setProducts] = useState([]); 
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate(); 
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("http://127.0.0.1:8000/products/");
    setProducts(response.data);
  }; 
  const addToCart = async (product) => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/cart/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1,
      }),
    });

    if (response.ok) {
      alert("Added to cart");
    } else {
      const error = await response.text();
      alert("Error: " + error);
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
    alert("Failed to add item to cart");
  }
}; 
const fetchAddresses = async () => {
  const token = localStorage.getItem("token");

  console.log("Token from localStorage:", token);

  if (!token) {
    alert("No authentication token found. Please log in again.");
    navigate("/login");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8000/address/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Address fetch status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Address fetch error response:", errorText);
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Addresses fetched:", data);
    setAddresses(data);
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    alert("Failed to fetch addresses: " + error.message);
  }
};

  const placeOrder = async (product) => {
    console.log("BUY NOW CLICKED", product);
    const token = localStorage.getItem("token");
    console.log("USER ID FROM STORAGE:", localStorage.getItem("user_id"));

    const user_id = Number(localStorage.getItem("user_id"));

    if (!token) {
      navigate("/login");
      return;
    }

    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id,
          product_id: selectedProduct.id,
          quantity,
          address: `${selectedAddress.address_line}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.pincode}`,
        }),
      });

      const text = await response.text();
      console.log("STATUS:", response.status);
      console.log("RESPONSE:", text);

      if (response.ok) { 
        setShowPopup(false); 
        setShowSummary(false);
        navigate("/dashboard/orders");
      } else {
        alert(text);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  }; 
  const openRazorpay = async () => {
  const token = localStorage.getItem("token");

  try {
    const totalAmount = selectedProduct.price * quantity;

    const response = await fetch(
      "http://localhost:8000/payments/create-razorpay-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      }
    );

    const order = await response.json();

    const options = {
      key: "rzp_test_T1nCpnhYiBkee4",
      amount: order.amount,
      currency: order.currency,
      order_id: order.order_id,
      name: "My Shop",
      description: selectedProduct.name,

      handler: async function (response) {
        const verify = await verifyPayment(response);

        if (verify?.verified) {
          await placeOrder();
          navigate("/order-success");
        } else {
          navigate("/order-failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
    alert("Unable to start payment");
  }
};

const verifyPayment = async (paymentResponse) => {

  try {

    const response = await fetch(
      "http://localhost:8000/payments/verify-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentResponse),
      }
    );

    const result = await response.json();

    if (result.verified) {

      await placeOrder();

    } else {

      alert("Payment verification failed");
    }

  } catch (error) {

    console.error(error);

    alert("Verification failed");
  }
};

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "25px",
          padding: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "#f8fafc95",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                height: "220px",
                backgroundColor: "#f8fafc95",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://picsum.photos/300"
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>

            <div
              style={{
                paddingTop: "15px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#feefe9",
                  color: "s#793aed",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  fontSize: "16px",
                }}
              >
                Featured
              </span>

              <h3
                style={{
                  marginTop: "12px",
                  marginBottom: "8px",
                  color: "#1e293b",
                }}
              >
                {product.name}
              </h3>

              <p
                style={{
                  color: "#64748b",
                  minHeight: "50px",
                  marginBottom: "10px",
                }}
              >
                {product.description}
              </p>

              <h2
                style={{
                  color: "#8b5cf6",
                  marginBottom: "15px",
                }}
              >
                ₹ {product.price}
              </h2>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button 
                  onClick={() => addToCart(product)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "#f1f5f9",
                    color: "#475569",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "0.2s ease",
                  }}
                >
                  Cart
                </button>

                <button 
                  disabled={product.stock === 0}
                  onClick={async () => {
                  setSelectedProduct(product);
                  setQuantity(1);

                 await fetchAddresses();

                 setSelectedAddress(null);
                 setShowPopup(true);
               }}
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "#ddd6fe",
                    color: "#5b21b6",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "0.2s ease",
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
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
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "12px",
              width: "400px",
            }}
          >
            <h2>Confirm Order</h2>

            <p>
              Product: <strong>{selectedProduct?.name}</strong>
            </p>

            <div style={{ marginBottom: "15px" }}>
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Delivery Address</label>
              <div>
                <h4>Select Delivery Address</h4>
                <div
                  style={{
                    maxHeight: "250px",
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      style={{
                        display: "block",
                        border: "1px solid #ddd",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                      }}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddress?.id === addr.id}
                        onChange={() => setSelectedAddress(addr)}
                      />

                      <strong>{addr.full_name}</strong>

                      <p>
                        {addr.address_line},
                        {addr.city},
                        {addr.state},
                        {addr.pincode}
                      </p>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                }}
              >
                Cancel
              </button>

              <button
  onClick={() => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    setShowPopup(false);
    setShowSummary(true);
  }}
  style={{
    flex: 1,
    padding: "10px",
    backgroundColor: "#ddd6fe",
    color: "#5b21b6",
    border: "none",
    borderRadius: "6px",
  }}
>
  Continue
</button>
            </div>
          </div>
        </div>
      )} 
 {showSummary && (
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
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
        width: "450px",
      }}
    >
      <h2>Order Summary</h2>

      <p>
        Product:
        <strong> {selectedProduct?.name}</strong>
      </p>

      <p>
        Price:
        ₹{selectedProduct?.price}
      </p>

      <p>
        Quantity:
        {quantity}
      </p>

      <p>
        Total:
        ₹{selectedProduct?.price * quantity}
      </p>

      <hr />

      <h4>Deliver To</h4>

      <p>
        <strong>{selectedAddress?.full_name}</strong>
      </p>

      <p>{selectedAddress?.address_line}</p>

      <p>
        {selectedAddress?.city},
        {" "}
        {selectedAddress?.state}
      </p>

      <p>{selectedAddress?.pincode}</p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => {
            setShowSummary(false);
            setShowPopup(true);
          }}
          style={{
            flex: 1,
            padding: "10px",
          }}
        >
          Back
        </button>

        <button
          onClick={openRazorpay}
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: "#ddd6fe",
            color: "#5b21b6",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  </div>
)}    
    </>
  );
}

export default ProductList;
