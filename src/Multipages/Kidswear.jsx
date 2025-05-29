



import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaEye, FaHeart , FaRegStar } from "react-icons/fa";
import Productjson from "../Product.json";
import { useStore } from './CartContext/Context';

const Kidswear = () => {
  const { Addtocart, addToFavorites } = useStore();
  const [products, setProducts] = useState(Productjson);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState([]);

  // SIZE FILTER METHOD 
  const allSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const ratingOptions = [4, 3, 2, 1];

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const filterProducts = (category = selectedCategory) => {
    setSelectedCategory(category || "All");

    let filtered = Productjson;

    if (category && category !== "All") {
      filtered = filtered.filter(product => product.category === category);
    }

    // PRICE FILTER METHODE 
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    filtered = filtered.filter(product => product.rating >= minRating);

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        selectedSizes.includes(product.size)
      );
    }

    setProducts(filtered);
  };

  useEffect(() => {
    filterProducts(selectedCategory);
  }, [priceRange, minRating, selectedSizes]);

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
    <div className='flex flex-col lg:flex-row pt-1'>
      {/* Sidebar */}
      <div className='lg:w-1/4 w-full p-4 bg-gray-100 lg:sticky  top-0 h-fit'>
        <h2 className='text-xl font-semibold mb-4 text-orange-400'>Filters</h2>

        {/* Category Filter */}
        <div className='grid gap-3 pt-4'>
          <button
            onClick={() => filterProducts("All")}
            className='p-2 rounded-xl bg-orange-400 text-white hover:bg-orange-500 transition-all'
          >
            Show All
          </button>
          {["KID'S WEAR", "men", "women", "formals", "saree", "traditional"].map(category => (
            <button
              key={category}
              onClick={() => filterProducts(category)}
              className='p-2 rounded-xl bg-gray-300 hover:bg-gray-900 hover:text-white transition-all'
            >
              {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Price Range Filter */}
        <div className="mt-6">
          <h3 className='font-semibold text-gray-700 mb-2'>Price Range</h3>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className='w-full'
          />
          <p className='text-sm text-gray-600 mt-1'>Up to ₹{priceRange[1]}</p>
        </div>

        {/* Rating Filter - Buttons */}
        <div className="mt-6">
          <h3 className='font-semibold text-gray-700 mb-2 '> Rating</h3>
          <div className="flex flex-wrap gap-2">
            {ratingOptions.map(rating => (
              <button
                key={rating}
                onClick={() => setMinRating(rating)}
                className={`flex items-center gap-1 px-3 py-1 rounded-xl border text-sm ${
                  minRating === rating ? 'bg-yellow-400 text-white' : 'bg-white text-gray-700 border-gray-300'
                } hover:bg-yellow-500 transition`}
              >
                <FaStar className="text-yellow-500" /> {rating}+
              </button>
            ))}
          </div>
        </div>

        {/* Size Filter - Buttons */}
        <div className="mt-6">
          <h3 className='font-semibold text-gray-700 mb-2'>Size</h3>
          <div className="flex flex-wrap gap-2">
            {allSizes.map(size => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1 rounded-xl border text-sm ${
                  selectedSizes.includes(size) ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 border-gray-300'
                } hover:bg-gray-700 hover:text-white transition`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:w-3/4 w-full p-4">
        {/* Header Section */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-sm text-orange-400">Top Selling Products for Kids</p>
          <h1 className="text-3xl font-bold py-2 capitalize">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h1>
          <p className="text-gray-500">
            Explore our handpicked collection made for style and comfort.
          </p>
        </div>

       {/* Products Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-5 ">
          {products.length > 0 ? (
            products.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="group space-y-2 relative bg-white text-center p-3 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="relative">
                  <img
                    src={data.img}
                    alt={data.title}
                    className="h-[220px] w-full object-cover  rounded-md group-hover:scale-105 transition-all duration-500"
                  />
                  <Link
                  to={`/Kidswear/${data.id}`}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:shadow-md opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <FaEye size={18} className="text-gray-700" />
                  </Link>
                  <Link 
                    // to="/favoritelist"
                    onClick={() => addToFavorites(data)}
                  className='absolute top-10 right-2 bg-white p-1 rounded-full shadow hover:shadow-md opacity-0 group-hover:opacity-100 transition-all'
                  >
                    <FaHeart size={18} className='pt-0.5'/>
                  </Link>
                </div>
                <div>
                  <h3 data-aos="fade-right"  data-aos-duration = "500" className="font-semibold text-sm">{data.title}</h3>
                  <p data-aos="fade-right"  data-aos-duration = "600" className="text-xs text-gray-500">{data.color}</p>
                  <div data-aos="fade-right"  data-aos-duration = "700" className="flex items-center justify-center gap-1 text-yellow-400 text-sm">
                    <span data-aos="fade-right"  data-aos-duration = "800">{getStars(data.rating)}</span>
                  </div>
                  <div data-aos="fade-right"  data-aos-duration = "900" className="text-sm text-gray-600 group-hover:text-red-500 transition font-bold py-2">
                    ₹ {data.price}
                  </div>
                  <Link
                  to={`/Kidswear/${data.id}`}
                  data-aos="fade-right"  data-aos-duration = "900"
                    onClick={handleAddToCart}
                    className="inline-block mt-2 text-sm bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition font-bold"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
        </div>

        {/* View All / Reset */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              setSelectedCategory("All");
              setPriceRange([0, 10000]);
              setMinRating(0);
              setSelectedSizes([]);
              setProducts(Productjson);
            }}
            className="bg-orange-400 text-white px-6 py-2 rounded hover:bg-orange-500 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kidswear;
