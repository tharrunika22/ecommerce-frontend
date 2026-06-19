import { useState , useEffect } from "react"; 
import axios from "axios";
function Inventory() {
  const [showForm, setShowForm] = useState(false); 
  const [formData, setFormData] = useState({
  name: "",
  description: "",
  price: "",
  stock: "", 
  image_urls: [""],
});
const handleAddProduct = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://127.0.0.1:8000/products/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ); 
     await fetchProducts();

    alert("Product Added");

    setShowForm(false);

  } catch (error) {
    console.error(error);
    alert("Failed to add product");
  }
}; 
const [products, setProducts] = useState([]);
const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://127.0.0.1:8000/products/vendor/products",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProducts(response.data);

  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchProducts();
}, []); 
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  boxSizing: "border-box",
};

const thStyle = {
  textAlign: "left",
  padding: "15px",
  color: "#334155",
};

const tdStyle = {
  padding: "15px",
};
  return (
  <div
    style={{
      padding: "30px",
      background: "#f8fafc",
      minHeight: "100vh",
    }}
  >
    {/* Header */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            color: "#0f172a",
          }}
        >
          Inventory
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "5px",
          }}
        >
          Manage your products
        </p>
      </div>

      <button
        onClick={() => setShowForm(true)}
        style={{
          background: "#4f46e5",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
          boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
        }}
      >
        + Add Product
      </button>
    </div>

    {/* Stats Card */}
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "25px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#334155",
        }}
      >
        Total Products
      </h3>

      <h1
        style={{
          marginTop: "10px",
          color: "#4f46e5",
        }}
      >
        {products.length}
      </h1>
    </div>

    {/* Add Product Modal */}
    {showForm && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            width: "500px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <h2>Add Product</h2>

          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            style={{
              ...inputStyle,
              height: "100px",
            }}
          />

          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) =>
              setFormData({
                ...formData,
                stock: e.target.value,
              })
            }
            style={inputStyle}
          /> 
          <h4
  style={{
    marginBottom: "10px",
    color: "#334155",
  }}
>
  Product Images
</h4>

{formData.image_urls.map((url, index) => (
  <div
    key={index}
    style={{
      display: "flex",
      gap: "10px",
      marginBottom: "12px",
      alignItems: "center",
    }}
  >
    <input
      type="text"
      placeholder={`Image URL ${index + 1}`}
      value={url}
      onChange={(e) => {
        const urls = [...formData.image_urls];
        urls[index] = e.target.value;

        setFormData({
          ...formData,
          image_urls: urls,
        });
      }}
      style={{
        ...inputStyle,
        marginBottom: 0,
      }}
    />

    {/* Add Button */}

    {index === formData.image_urls.length - 1 &&
      formData.image_urls.length < 3 && (
        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              image_urls: [
                ...formData.image_urls,
                "",
              ],
            })
          }
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "none",
            background: "#4f46e5",
            color: "white",
            fontSize: "22px",
            fontWeight: "bold",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          +
        </button>
      )}

    {/* Remove Button */}

    {formData.image_urls.length > 1 && (
      <button
        type="button"
        onClick={() => {
          const urls = formData.image_urls.filter(
            (_, i) => i !== index
          );

          setFormData({
            ...formData,
            image_urls: urls,
          });
        }}
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "none",
          background: "#ef4444",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    )}
  </div>
))}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => setShowForm(false)}
              style={{
                padding: "10px 16px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "white",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

            <button
              onClick={handleAddProduct}
              style={{
                padding: "10px 16px",
                border: "none",
                borderRadius: "8px",
                background: "#4f46e5",
                color: "white",
                cursor: "pointer",
              }}
            >
              Save Product
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Product Table */}
    <div
      style={{
        background: "white",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f1f5f9",
            }}
          >
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Image</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <td style={tdStyle}>
                  {product.name}
                </td>

                <td style={tdStyle}>
                  ₹{product.price}
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background:
                        product.stock > 0
                          ? "#dcfce7"
                          : "#fee2e2",
                      color:
                        product.stock > 0
                          ? "#166534"
                          : "#991b1b",
                      padding: "5px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                    }}
                  >
                    {product.stock} 
                  </span>
                </td>
                <td style={tdStyle}>
  {product.images?.length > 0 ? (
    <img
      src={product.images[0]}
      alt={product.name}
      style={{
        width: "60px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "10px",
      }}
    />
  ) : (
    "No Image"
  )}
</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#64748b",
                }}
              >
                No products added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}
export default Inventory;