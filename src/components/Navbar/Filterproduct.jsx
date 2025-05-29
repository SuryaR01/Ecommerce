


  import { Link, useParams } from "react-router-dom";
import NavbarJson from "../../components/Navbar/Navbar.json";
import { useStore } from "../../Multipages/CartContext/Context";
import { CiHeart, CiSaveDown1 } from "react-icons/ci";
import { FaEye, FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import error from "../../assets/error/Oops!.jpeg";

const Filterproduct = () => {
  const { categoryName } = useParams();
  const { Addtocart, addToFavorites } = useStore();

  const [selectedSize, setSelectedSize] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Flatten product list from JSON
  const rawProducts = NavbarJson.flatMap((item) =>
    item.sections.flatMap((section) =>
      section.items
        .filter((subItem) => subItem.list && subItem.name)
        .flatMap((subItem) =>
          subItem.list.map((product) => ({
            ...product,
            sectionTitle: section.title,
            subItemName: subItem.name,
          }))
        )
    )
  );

  // Check if the categoryName is a main section (e.g., "Men", "Women", "Kids")
  const sectionExists = NavbarJson.some((item) =>
    item.sections.some((section) => section.title === categoryName)
  );

  // Determine the section title
  const sectionTitle = sectionExists
    ? categoryName
    : rawProducts.find((p) => p.category === categoryName)?.sectionTitle || "";

  // Show all products from the section or subcategory based on logic
  const allProducts = rawProducts.filter((p) =>
    sectionExists || showAllProducts
      ? p.sectionTitle === sectionTitle
      : p.category === categoryName
  );

  // Apply filters
  const filteredProducts = allProducts.filter((product) => {
    const matchSize = selectedSize
      ? product.size?.includes(selectedSize)
      : true;
    const matchPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchRating = product.rating >= minRating;
    return matchSize && matchPrice && matchRating;
  });

  // Helper: show star ratings
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

  // Add to cart handler
  const handleAddToCart = (product) => {
    const productWithSize = {
      ...product,
      size: selectedSize || "Not Selected",
    };
    Addtocart(productWithSize, 1);
  };

  return (
    <div className="md:flex relative sm:grid-cols-2">
      {/* Sidebar Filter */}
      <div className="w-full h-[630px] md:w-64 p-5 border-r border-gray-200 md:sticky top-0">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Filter
          <CiSaveDown1
            size={24}
            className="hover:rotate-180 transition-all duration-200"
          />
        </h2>

        {/* Size Filter */}
        <div className="mb-6 md:w-60">
          <label className="block font-semibold mb-2">Size</label>
          <div className="max-w-md">
            {["All Sizes", "S", "M", "L", "XL", "XS", "XXL"].map((size) => (
              <button
                key={size}
                className={`px-4 py-2 m-1 border rounded ${
                  selectedSize === size ||
                  (size === "All Sizes" && selectedSize === "")
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() =>
                  setSelectedSize(size === "All Sizes" ? "" : size)
                }
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full"
          />
          <p className="text-sm mt-1">Under ₹{priceRange[1]}</p>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Rating</label>
          <select
            className="w-full p-2 border rounded"
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
          >
            <option value={0}>All Ratings</option>
            <option value={4}>4 ⭐ & up</option>
            <option value={3}>3 ⭐ & up</option>
            <option value={2}>2 ⭐ & up</option>
          </select>
        </div>
      </div>

      {/* Product Content */}
      <div className="flex-1 mt-6 px-4">
        {sectionTitle && (
          <>
            <h1 className="text-2xl font-bold mb-6 pl-5 uppercase">
              {sectionTitle}
            </h1>
            {!sectionExists && (
              <button
                className={`ml-5 mb-6 px-4 py-2 rounded-full border text-sm font-medium ${
                  showAllProducts ? "bg-black text-white" : "bg-white text-black"
                }`}
                onClick={() => setShowAllProducts((prev) => !prev)}
              >
                {showAllProducts ? "Show Subcategory" : "Show All Products"}
              </button>
            )}
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 rounded shadow-2xl relative group"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-all duration-500 rounded-3xl"
                />
                <h2 className="font-bold text-lg mt-2">{product.title}</h2>
                <p className="text-gray-600 font-bold group-hover:text-red-500">
                  ₹ {product.price}
                </p>
                <p className="text-sm text-yellow-600">
                  {getStars(product.rating)}
                </p>
                <p className="text-xs text-gray-500 italic my-2">
                  {product.subItemName}
                </p>

                <div className="opacity-0 group-hover:opacity-100 duration-500">
                  <Link
                    to={`/Filterproduct/${product.id}`}
                    className="absolute right-6.5 bottom-3 hover:text-cyan-600"
                  >
                    <FaEye size={25} />
                  </Link>
                  <Link
                    onClick={() => addToFavorites(product)}
                    className="absolute bottom-10 right-6 hover:text-red-600"
                  >
                    <CiHeart size={30} />
                  </Link>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-amber-600 p-2 rounded-xl mt-4 px-4 text-white hover:bg-amber-700 font-bold"
                >
                  Buy Now
                </button>
              </div>
            ))
          ) : (
            <div
              className="flex justify-center items-center text-center col-span-full text-gray-600"
              style={{
                backgroundImage: `url(${error})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "100vh",
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filterproduct;
