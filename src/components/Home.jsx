import React from "react";
import Hero from "../components/Hero/Hero";
import Products from "../components/Products/Products";
import TopProducts from "../components/TopProducts/TopProducts";
import Banner from "../components/Banner/Banner";
import Subscribe from "../components/Subscribe/Subscribe";
import Testimonial from "../components/Testimonials/Testimonial";
import Category from "./Category/Category";
import { Route } from "react-router-dom";


const Home = ({handleOrderPopup}) => {
  return (
    <div>
      <Hero handleOrderPopup={handleOrderPopup} />
      <Category />
      <Products handleOrderPopup={handleOrderPopup} />
      <TopProducts handleOrderPopup={handleOrderPopup} />
      <Banner />
      <Testimonial />
      <Subscribe />
    </div>
  );
};

export default Home;
