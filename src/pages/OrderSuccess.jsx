import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {

  const navigate = useNavigate();

  return (
    <div style={{padding:"50px",textAlign:"center"}}>
      <h1>✅ Payment Successful</h1>

      <p>Your order has been placed.</p>

      <button
        onClick={() => navigate("/orders")}
      >
        View Orders
      </button>
    </div>
  );
}