


import React from "react";
import Img1 from "../../assets/shirt/shirt.png";
import Img2 from "../../assets/shirt/shirt2.png";
import Img3 from "../../assets/shirt/shirt3.png";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Filterproduct from "../Navbar/Filterproduct";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Casual Wear",
    description: "Stylish and comfortable casual wear perfect for everyday use.",
  },
  {
    id: 2,
    img: Img2,
    title: "Printed Shirt",
    description: "Trendy printed shirt to elevate your wardrobe with vibrant patterns.",
  },
  {
    id: 3,
    img: Img3,
    title: "Women's Shirt",
    description: "Chic and elegant women's shirt suitable for casual and formal outings.",
  },
  {
    id: 4,
    img: Img2,
    title: "Slim Fit Shirt",
    description: "Sleek slim-fit design that gives a modern and tailored look.",
  },
  {
    id: 5,
    img: Img1,
    title: "Office Shirt",
    description: "Perfect shirt for business casuals and office attire.",
  },
  {
    id: 6,
    img: Img3,
    title: "Designer Shirt",
    description: "Designer collection for special occasions and parties.",
  },
  {
    id: 7,
    img: Img2,
    title: "Denim Shirt",
    description: "Durable and trendy denim shirt with a rugged look.",
  },
  {
    id: 8,
    img: Img1,
    title: "Cotton Shirt",
    description: "Breathable cotton shirt for comfort in all seasons.",
  }, {
    id: 9,
    img: Img2,
    title: "Cotton Shirt",
    description: "Breathable cotton shirt for comfort in all seasons.",
  }, {
    id: 10,
    img: Img3,
    title: "Cotton Shirt",
    description: "Breathable cotton shirt for comfort in all seasons.",
  },
];

const TopProducts = ({ handleOrderPopup }) => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="text-left mb-10 px-4">
        <p data-aos="fade-up" className="text-sm text-orange-400">
          Top Rated Products For You
        </p>
        <h1 data-aos="fade-up" className="text-3xl font-bold">
          Best Products
        </h1>
        <p
          data-aos="fade-up"
          className="text-sm text-gray-500 pt-3 max-w-2xl"
        >
          Discover our collection of top-rated shirts designed to meet all your fashion needs.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
        {ProductsData.map((data, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            className=" mt-4 rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-orange-400 hover:text-white shadow-xl group p-4 w-full max-w-[250px] transition-all duration-500"
          >
            {/* Image */}
            <div className="h-[120px] flex items-center justify-center">
              <img
                src={data.img}
                alt={data.title}
                className="max-w-[150px] group-hover:scale-105 transition-all duration-300 drop-shadow-md"
              />
            </div>

            {/* Details */}
            <div className="text-center mt-10">
              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <h2 className="text-lg font-semibold">{data.title}</h2>
              <p className="text-sm text-gray-500 group-hover:text-white mt-1 line-clamp-2">
                {data.description}
              </p>
              <button
                
                // onClick={handleOrderPopup}
                className="bg-orange-400 hover:scale-105 transition-all duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-orange-400"
              >
                <Link to={"/category/Formal-Shirts"}>Order Now</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
