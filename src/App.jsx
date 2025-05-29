import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cartpage from "./components/addtocart/CartContext";
// import Products from "./components/Products/Products";
import Toprated from "./Multipages/Toprated";
import Kidswear from "./Multipages/Kidswear";
import Vieworder from "./Multipages/Vieworder";
import Checkout from "./Multipages/Checkout";
import Singleproductpage from "./Multipages/Singleproductpage";
import Delivery from "./Multipages/Delivery";
import Favorite from "./Multipages/Favorite";
import Filterproduct from "./components/Navbar/Filterproduct";
import Navsingleproduct from "./components/Navbar/Navsingleproduct";
import Login from "./Multipages/Login/Login";
import Register from "./Multipages/Login/Register";

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar handleOrderPopup={handleOrderPopup} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/toprate" element={<Toprated />} />
          <Route path="/kidswear" element={<Kidswear />} />
          <Route path="/viewcart" element={<Vieworder />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/kidswear/:id" element={<Singleproductpage />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/favoritelist" element={<Favorite />} />
          <Route path="/category/:categoryName" element={<Filterproduct />} />
          <Route path="/Filterproduct/:id" element={<Navsingleproduct />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element ={ <Register /> } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
