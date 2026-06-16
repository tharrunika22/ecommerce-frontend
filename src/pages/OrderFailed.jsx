import { useNavigate } from "react-router-dom";

export default function OrderFailed() {

  const navigate = useNavigate();

  return (
    <div style={{padding:"50px",textAlign:"center"}}>

      <h1>❌ Payment Failed</h1>

      <p>Please try again.</p>

      <button
        onClick={() => navigate("/dashboard/products")}
      >
        Back To Products
      </button>

    </div>
  );
}