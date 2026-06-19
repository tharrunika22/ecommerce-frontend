import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <img
        src="https://picsum.photos/600"
        alt={product.name}
        style={{
          width: "400px",
          borderRadius: "10px",
        }}
      />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <h2>₹ {product.price}</h2>

      <p>
        Stock: {product.stock}
      </p>
    </div>
  );
}

export default ProductDetails;