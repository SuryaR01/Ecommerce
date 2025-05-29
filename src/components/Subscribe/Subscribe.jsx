import React from "react";
import Banner from "../../assets/website/orange-pattern.jpg";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};
const Subscribe = () => {

    const Subscribee = () => {
        alert("Thanks For Subscribe")
    };
  return (
    <div
      data-aos="zoon-in"
      className="  bg-gray-100 dark:bg-gray-800 text-white"
      style={BannerImg}
    >
      <div className="container backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-xl mx-auto flex items-center justify-center flex-col">
          <h1 className=" text-2xl text-center sm:text-4xl font-semibold">
            Get Notified About New Products
          </h1>
          <input
            data-aos="fade-up"
            type="text"
            placeholder="Enter your email"
            className="w-full p-3 bg-amber-50 rounded-full text-gray-600 "
          />
          <button onClick={Subscribee} className=" border-2 border-none px-5 py-2 rounded-full bg-green-100 text-black hover:scale-105 duration-300 hover:text-white hover:bg-orange-700">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
