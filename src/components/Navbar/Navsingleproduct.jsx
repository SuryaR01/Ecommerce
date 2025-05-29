import React, { useState } from "react";
import NavbarJson from "../../components/Navbar/Navbar.json";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../Multipages/CartContext/Context";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function Navsingleproduct() {
  const { Addtocart } = useStore();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const singleproduct = NavbarJson.flatMap((section) => section.sections)
    .flatMap((section) => section.items)
    .flatMap((item) => item.list || [])
    .find((product) => product.id === parseInt(id));

  if (!singleproduct) {
    return (
      <h2 className="text-center text-xl text-red-600 mt-10">
        Product not found
      </h2>
    );
  }

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
    <div className="container mx-auto px-6 py-10 relative mt-10">
      <h1 className="font-bold text-orange-500 text-4xl mb-8 text-center">
        {singleproduct.title}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}

        <div className="relative w-full lg:w-1/2 shadow hover:shadow-lg rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={singleproduct.img}
            alt={singleproduct.title}
            className="w-full h-auto max-h-96 object-contain p-4 hover:scale-105 transition-all duration-500"
          />
          {isLiked ? (
            <FaHeart
              size={35}
              className="absolute top-10 right-10 text-red-500 cursor-pointer"
              onClick={() => setIsLiked(false)}
              title="Remove from wishlist"
            />
          ) : (
            <FaRegHeart
              size={35}
              className="absolute top-10 right-10 text-red-500 cursor-pointer"
              onClick={() => setIsLiked(true)}
              title="Add to wishlist"
            />
          )}
        </div>

        {/* Product Info Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Price:{" "}
            <span className="text-green-600">₹ {singleproduct.price}</span>
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
    </div>
  );
}

export default Navsingleproduct;
