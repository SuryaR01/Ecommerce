import React from "react";
import Slider from "react-slick";
import { FaStar, FaRegStar } from "react-icons/fa";

const TestimonialData = [
  {
    id: 1,
    name: "Vasanth",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/101/101",
    rating : 4.0,
  },
  {
    id: 2,
    name: "Satya Nadella",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/102/102",
    rating : 3.0 ,
  },
  {
    id: 3,
    name: "Virat Kohli",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/104/104",
    rating : 4.0 ,
  },
  {
    id: 5,
    name: "Saravanan",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/103/103",
    rating : 5.0 ,
  },
];

// Base slider settings
const baseSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  cssEase: "linear",
  pauseOnHover: true,
  pauseOnFocus: true,
  responsive: [
    {
      breakpoint: 10000,
      settings: { slidesToShow: 4 },
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
};

const Testimonial = () => {
  const leftToRight = { ...baseSettings, rtl: false }; // Default
  const rightToLeft = { ...baseSettings, rtl: true };  // Reversed direction

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


  return (
    <div className="py-10 mb-10 px-10">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className=" text-orange-300 font-bold text-xl">Testimonial</p>
          <h1 className="text-3xl font-bold">What our Customers Are Saying</h1>
          <p className="text-md text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
            aliquam obcaecati commodi exercitationem labore laborum pariatur
            voluptas, repellat atque esse?
          </p>
        </div>

        {/* Testimonial Sliders */}
        <div className="w-full">
          {/* Left to Right */}
          <Slider {...leftToRight}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="w-full my-6">
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800  relative">
                  <div className="mb-4">
                    <img src={data.img} alt="review" className="rounded-full w-20 h-20" />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <h1 className="text-xl font-bold text-black/80 dark:text-light">{data.name}</h1>
                       <h1 className=" font-bold">{getStars(data.rating)}</h1>
                      <p className="text-xs text-gray-500">{data.text}</p>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">,,</p>
                </div>
              </div>
            ))}
          </Slider>

          {/* Right to Left */}
          <Slider {...rightToLeft}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="w-full my-6">
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 relative">
                  <div className="mb-4">
                    <img src={data.img} alt="review" className="rounded-full w-20 h-20" />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <h1 className="text-xl font-bold text-black/80 dark:text-light">{data.name}</h1>
                      <h1 className=" font-bold">{getStars(data.rating)}</h1>
                      <p className="text-xs text-gray-500">{data.text}</p>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">,,</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
