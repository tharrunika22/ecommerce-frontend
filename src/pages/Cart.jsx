import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/cart/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setItems(data);
  };
const handleRemove = async (cartId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:8000/cart/${cartId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setItems((prev) =>
      prev.filter((item) => item.id !== cartId)
    );
  } catch (err) {
    console.error(err);
  }
}; 
const handleCheckout = async () => {

  try {

    const token = localStorage.getItem("token");


    const totalAmount = items.reduce((acc, item) => {
      const price = Number(item.product?.price || 0);
      return acc + price * item.quantity;
    }, 0);



    // Create Razorpay Order

    const response = await axios.post(
      "http://localhost:8000/payments/create-razorpay-order",
      {
        amount: totalAmount
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );


    const order = response.data;

    console.log("Response", order)

    const options = {

      key: "rzp_test_T3UYaUt3w1wIoS",

      amount: order.amount,

      currency: order.currency,

      name: "My Store",

      description: "Cart Payment",

      order_id: order.id,


      handler: async function(paymentResponse){
        console.log("Response2",paymentResponse)  

        // verify payment

        await axios.post(
          "http://localhost:8000/payments/verify-payment",
          {
            razorpay_order_id:
              paymentResponse.razorpay_order_id,

            razorpay_payment_id:
              paymentResponse.razorpay_payment_id,

            razorpay_signature:
              paymentResponse.razorpay_signature,

            user_id: parseInt(localStorage.getItem("user_id")),
            amount: totalAmount
          },
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );


        alert("Payment Successful");


      },


      prefill:{
        name:"",
        email:"",
        contact:""
      },


      theme:{
        color:"#7c3aed"
      }

    };



    const razorpay = new window.Razorpay(options);

    razorpay.open();



  }
  catch(error){

    console.log(error);

  }

};
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-3xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold">🛒 My Cart</h1>
        <p className="mt-2 text-violet-100">
          Review your selected products before checkout
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-md">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold text-gray-700">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mt-2">
            Start shopping and add products to your cart.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {items.map((item) => {
              const product = item.product || {};
              const price = Number(product.price || 0);
              const total = price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    {/* Left */}
                    <div className="flex gap-5">
                      <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center text-4xl">
                        📦
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {product.name}
                        </h3>

                        <p className="text-gray-500 mt-2">
                          {product.description}
                        </p>

                        <div className="flex gap-3 mt-4 flex-wrap">
                          <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                            Qty: {item.quantity}
                          </span>

                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            Stock: {product.stock}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col justify-between items-end">
                      <div className="text-right">
                        <p className="text-gray-500 text-sm">
                          Price per item
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800">
                          ₹{price}
                        </h3>

                        <p className="mt-2 text-lg font-semibold text-violet-600">
                          Total: ₹{total}
                        </p>
                      </div>

                      <div className="flex gap-3 mt-5">
                        <button
 onClick={handleCheckout}
 className="px-5 py-2 rounded-xl bg-violet-600 text-white"
>
Checkout
</button>

                        <button
  onClick={() => handleRemove(item.id)}
  className="px-5 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 font-semibold transition"
>
  Remove
</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <CartSummary 
          items={items} 
            handleCheckout={handleCheckout}
          />
        </>
      )}
    </div>
  );
}

function CartSummary({ items,handleCheckout}) {
  const totalAmount = items.reduce((acc, item) => {
    const price = Number(item.product?.price || 0);
    return acc + price * item.quantity;
  }, 0);

  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Cart Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Total Products</span>
          <span>{items.length}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Total Quantity</span>
          <span>{totalItems}</span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold text-violet-600">
          <span>Grand Total</span>
          <span>₹{totalAmount}</span>
        </div>

        <button
 onClick={handleCheckout}
 className="w-full mt-6 bg-violet-600 text-white py-3 rounded-xl"
>
Proceed to Checkout
</button>
      </div>
    </div>
  );
}

export default Cart;