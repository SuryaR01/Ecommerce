import React from "react";
import Productjson from "../Product.json";
import { Link, useParams } from "react-router-dom";
import { FaStar, FaEye, FaRegStar } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useStore } from "./CartContext/Context";
import { useState } from "react";

function Singleproductpage() {
  const { Addtocart } = useStore();
  const [selectedSize, setSelectedSize] = useState("");

  const { id } = useParams();
  const singleproduct = Productjson.find((item) => item.id === parseInt(id));

  if (!singleproduct) {
    return (
      <h2 className="text-center text-xl text-red-600 mt-10">
        Product not found
      </h2>
    );
  }

  // STAR RATING FUNCTION

  const getStars = (rating) => {
    const fullStars = Math.round(rating);
    return Array.from({ length: 5 }, (_, i) =>
      i < fullStars ? (
        <FaStar key={i} className="text-yellow-400 inline text-sm mr-1" />
      ) : (
        <FaRegStar key={i} className="text-gray-300 inline text-sm mr-1" />
      )
    );
  };

  const handleAddToCart = () => {
    const productWithSize = {
      ...singleproduct,
      size: selectedSize || "Not Selected",
    };
    Addtocart(productWithSize, 1);
  };

  return (
    <div className="container mx-auto px-6 py-1 relative mt-5">
      <h1 className="font-bold text-orange-500 text-4xl mb-8 text-center">
        {singleproduct.title}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 shadow rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={`/${singleproduct.img}`}
            alt={singleproduct.title}
            className="w-full h-auto max-h-96 object-contain p-4 hover:scale-105 transition-all duration-500"
          />
        </div>

        {/* Product Info Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Price:{" "}
            <span className="text-green-600"> ₹ {singleproduct.price}</span>
          </h2>

          <div className="flex items-center gap-2 text-yellow-500">
            <span className="text-lg font-medium text-gray-700">
              {getStars(singleproduct.rating)}
            </span>
          </div>

          {/* Size Filter */}
          <div className="mb-6 md:w-60">
            <label className="block font-semibold mb-2">Size</label>
            <div className="max-w-md">
              {["S", "M", "L", "XL", "XS", "XXL"].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 m-1 border rounded ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setSelectedSize(size)}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <h3 className="text-lg text-gray-600">
            Color: <span className="font-semibold">{singleproduct.color}</span>
          </h3>

          <p className="text-gray-700 leading-relaxed text-justify">
            {singleproduct.desciption}
          </p>

          <Link
            to="/viewcart"
            onClick={handleAddToCart}
            className="bg-amber-500 p-3 rounded-2xl text-white hover:bg-amber-700"
          >
            ADD TO CART
          </Link>
        </div>
      </div>
      {/* <Link to={"/kidswear"} className=" absolute top-5 left-1 rounded-2xl p-1 bg-orange-400 hover:bg-red-600 " title="CLOSE THE TAB">
        <MdClose size={30}  className="text-white "/>
      </Link> */}
    </div>
  );
}

export default Singleproductpage;
