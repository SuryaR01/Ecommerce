import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [ username , setUsername ] = useState("");
    const [ password , setPassword ] = useState("");
    const [ message , setMessage ] = useState("");
    const [ messgarType , setMessageType ] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [] ;

        const foundUser = users.find((user) => user.username === username && user.password === password );
    

    if(foundUser) {
        localStorage.setItem("isAuthenticated" , "true");
        localStorage.setItem("username" , username);

        // if(foundUser.isAdmin || foundUser.username === "admin") {
        //     localStorage.setItem("isAdmin" , "true");
        // }else{
        //     localStorage.re
        // }



        setMessage("Login SuccessFully Done!");
    setMessageType("Success");

    setTimeout(() => {
        navigate('/')

        window.location.reload();
    } , 1000);
    }else{
        setMessage("InValid UserName Or Password.");
        setMessageType ("Error");
    }
    };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>

        

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {message && (
          <div
            className={`p-2 text-center text-sm rounded mb-4 ${
              messgarType === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="User Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
            onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account? <Link className="text-blue-600 cursor-pointer hover:underline" to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
