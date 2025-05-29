import React, { useState, useEffect } from "react";
import { useStore } from "./CartContext/Context";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [addres, setAddres] = useState({
    name: "",
    contact: "",
    email: "",
    pincode: "",
    address: "",
  });

  const { cortitem, RemoveOrdercart, setCortitem } = useStore();
  const navigate = useNavigate();

  const finalbill = cortitem.reduce(
    (acc, curnt) => acc + curnt.price * curnt.Quantity,
    0
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleadres = (e) => {
    setAddres({ ...addres, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const numericAmount = parseFloat(finalbill);
    if (isNaN(Math.round(numericAmount)) || numericAmount <= 0) {
      alert("Invalid amount");
      return;
    }

    localStorage.setItem("deliveryadd", JSON.stringify(addres));
    localStorage.setItem("deliverydet", JSON.stringify(cortitem));

    const orders = JSON.parse(localStorage.getItem("allorder")) || [];

    const neworder = {
      orderid: "ODR" + Date.now(),
      Orderdate: new Date().toISOString(),
      total:finalbill,
      deliveryadd: addres,
      deliverydet: cortitem,
    };

    localStorage.setItem("allorder", JSON.stringify([neworder, ...orders]));

    const options = {
      key: "rzp_test_J5uVuIKgMpadsi",
      amount: numericAmount * 100,
      currency: "INR",
      name: "STARTUP_PROJECTS",
      description: "Test Payment",
      handler: function (response) {
        alert(
          "Payment Successful!\nPayment ID: " + response.razorpay_payment_id
        );
        setCortitem([]);
        navigate("/delivery");
      },
      prefill: {
        name: addres.name,
        email: addres.email,
        contact: addres.contact,
      },
      notes: {
        address: addres.address,
      },
      theme: {
        color: "#ff5733",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div className="text-center my-5">
            <h1 className="text-2xl uppercase font-bold py-10 text-orange-400">
              Order Summary
            </h1>
            {cortitem.length > 0 ? (
              cortitem.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 m-5 rounded-3xl p-3 justify-around bg-white shadow"
                >
                  <div className="h-30 w-32">
                    <img
                      className="h-full w-full object-cover rounded-2xl"
                      src={item.img}
                      alt={item.title}
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <h2 className="sm:text-xl font-bold text-orange-500 text-[15px]">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="sm:text-2xl text-cyan-700">
                      ₹ {item.price * item.Quantity}
                    </p>
                    <p className="sm:text-md text-[15px] text-gray-500">
                      QUANTITY :{" "}
                      <span className="text-cyan-600">{item.Quantity}</span>
                    </p>
                  </div>
                  <div
                    onClick={() => RemoveOrdercart(item.id)}
                    className="flex items-center cursor-pointer hover:text-red-500"
                  >
                    <RiDeleteBin6Line className="sm:text-2xl" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-lg">Your cart is empty.</p>
            )}
            <h1 className="border rounded-2xl py-2 mx-5 text-2xl font-bold uppercase">
              Final bill : <span className=" text-red-500">₹</span>{" "}
              {finalbill.toFixed(2)}
            </h1>
          </div>

          {/* Address Details */}
          <div className="m-10 text-center lg:mt-10">
            <h1 className="text-orange-400 font-bold text-2xl py-9 uppercase">
              Details
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <input
                name="name"
                required
                onChange={handleadres}
                placeholder="NAME"
                className="bg-gray-200 shadow-md h-12 rounded-2xl pl-4 text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
              <input
                name="contact"
                type="number"
                required
                onChange={handleadres}
                placeholder="CONTACT"
                className="bg-gray-200 shadow-md h-12 rounded-2xl pl-4 text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
              <input
                name="email"
                type="email"
                required
                onChange={handleadres}
                placeholder="MAIL-ID"
                className="bg-gray-200 shadow-md h-12 rounded-2xl pl-4 text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
              <input
                name="pincode"
                type="text"
                required
                onChange={handleadres}
                placeholder="PIN-CODE"
                className="bg-gray-200 shadow-md h-12 rounded-2xl pl-4 text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
              <input
                name="address"
                type="text"
                required
                onChange={handleadres}
                placeholder="ADDRESS"
                className="bg-gray-200 shadow-md h-12 rounded-2xl pl-4 text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="mt-4 bg-orange-400 text-white font-bold py-2 rounded-2xl hover:bg-orange-500 transition duration-300"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
