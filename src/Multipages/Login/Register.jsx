


import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { FaUser,FaEnvelope,FaLock ,FaKey} from "react-icons/fa";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const Register = () => {
  const form = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMessage("Please enter a valid email.");
      setMessageType("error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const duplicate = users.find(
      (user) => user.username === username || user.email === email
    );

    if (duplicate) {
      setMessage("User with this username or email already exists.");
      setMessageType("error");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    const otp = generateOTP();
    setGeneratedOtp(otp);

    setTimeout(() => {
      emailjs
        .sendForm("service_a6grxsl", "template_gi7vneo", form.current, {
          publicKey: "isAR5Sy8Y4PABFBmC",
        })
        .then(() => {
          setOtpSent(true);
          setMessage(`OTP sent to ${email}`);
          setMessageType("success");
        })
        .catch(() => {
          setMessage("Failed to send OTP. Try again.");
          setMessageType("error");
        });
    }, 200);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (enteredOtp === generatedOtp) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const newUser = {
        username,
        email,
        password,
        isAdmin: username === "admin",
      };

      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      setMessage("OTP verified! Registration successful.");
      setMessageType("success");

      setTimeout(() => navigate("/login"), 1000);
    } else {
      setMessage("Incorrect OTP.");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-blue-500 mb-6">Register</h2>

        {message && (
          <div
            className={`mb-4 p-2 rounded text-sm ${
              messageType === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form
          ref={form}
          onSubmit={handleSendOtp}
          className="flex flex-col gap-4"
        >
            
          <div>
           
            <label className="block text-sm text-start font-medium text-gray-700 mb-1">User Name</label>    
            <input
            type="text"
            name="user_name"
            placeholder="User Name"
            
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            readOnly={otpSent}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>

          <div>
             <label className="block text-sm text-start font-medium text-gray-700 mb-1">Mail-ID</label> 
          <input
            type="email"
            name="user_email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly={otpSent}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>

          <div>
             <label className="block text-sm text-start font-medium text-gray-700 mb-1">PassWord</label> 
          <input
            type="password"
            name="user_password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            readOnly={otpSent}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>

          <textarea
            name="message"
            value={`Your OTP is: ${generatedOtp}`}
            readOnly
            hidden
          />

          {!otpSent && (
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send OTP to Email
            </button>
          )}
        </form>

        {otpSent && (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 mt-4">
            <div>
                 <label className="block text-sm text-start font-medium text-gray-700 mb-1">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
            >
              Verify OTP & Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;


