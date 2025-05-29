


import React from "react";
import BannerImg from "../../assets/women/women2.jpg";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="min-h-[650px] flex justify-center items-center py-10 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div data-aos="zoom-in" className="px-3">
            <img
              src={BannerImg}
              alt="Winter Sale"
              className="max-w-[500px] h-[450px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,0.4)] rounded-3xl object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center px-6 gap-8 sm:pt-0">
            <h1
              data-aos="fade-up"
              className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight"
            >
              Winter Sale Upto <span className="text-amber-500">50% Off</span>
            </h1>

            <p
              data-aos="fade-up"
              className="text-base text-gray-600 dark:text-gray-300 tracking-wide leading-relaxed"
            >
              Upgrade your wardrobe with the latest winter essentials! Discover
              cozy knits, stylish jackets, and trendy layers all at unbeatable
              prices. Shop now and embrace the season in style.
            </p>

            <ul className="flex flex-col gap-5 text-sm sm:text-base">
              <li data-aos="fade-up" className="flex items-center gap-4">
                <GrSecure className="text-4xl p-3 h-14 w-14 rounded-full bg-violet-100 dark:bg-violet-400 shadow" />
                <span className="text-gray-800 dark:text-white font-medium">
                  100% Quality Assured – We guarantee the best fabric and stitching
                </span>
              </li>
              <li data-aos="fade-up" className="flex items-center gap-4">
                <IoFastFood className="text-4xl p-3 h-14 w-14 rounded-full bg-orange-100 dark:bg-orange-400 shadow" />
                <span className="text-gray-800 dark:text-white font-medium">
                  Super-Fast Delivery – Get your orders within 2-3 days
                </span>
              </li>
              <li data-aos="fade-up" className="flex items-center gap-4">
                <GiFoodTruck className="text-4xl p-3 h-14 w-14 rounded-full bg-green-100 dark:bg-green-400 shadow" />
                <span className="text-gray-800 dark:text-white font-medium">
                  Flexible Payments – COD, UPI, Credit Cards & More
                </span>
              </li>
              <li data-aos="fade-up" className="flex items-center gap-4">
                <MdOutlineLocalOffer className="text-4xl p-3 h-14 w-14 rounded-full bg-yellow-100 dark:bg-yellow-400 shadow" />
                <span className="text-gray-800 dark:text-white font-medium">
                  Exclusive Offers – Daily deals and festive discounts
                </span>
              </li>
            </ul>

            <div data-aos="fade-up" className="mt-4">
              <Link
                to="/category/Formal-Shirts"
                className="inline-block bg-amber-600 hover:bg-amber-700 transition-colors duration-300 text-white font-semibold py-3 px-6 rounded-full shadow-lg"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
