import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/Men/Casual Shirts3.jpg";
import img2 from "../../assets/images/Kid/Dresses & Frocks4.jpg";
import img3 from "../../assets/images/Women/Sarees2.jpg";
import img4 from "../../assets/images/Women/Lehengas And Blouse4.jpg";
import img5 from "../../assets/images/Women/Suits3.jpg";
import img6 from "../../assets/images/Women/Skirts5.jpg";
import { Link } from "react-router-dom";

const categery = [
  {
    id: 1,
    imge: img1,
    title: "Men",
    navigate: "/category/Casual"
  },
  {
    id: 2,
    imge: img4,
    title: "Women",
    navigate: "/category/Lehengas And Blouse"
  },
  {
    id: 4,
    imge: img3,
    title: "Sarees",
    navigate: "/category/Sarees"
  },
  {
    id: 5,
    imge: img6,
    title: "Skirts",
    navigate: "/category/Skirts"
  },
  {
    id: 6,
    imge: img5,
    title: "Suits",
    navigate: "/category/Suits"
  }, 
  {
    id: 3,
    imge: img2,
    title: "Kid's",
    navigate: "/category/Twin-Sets-Dungrees"
  }
];

const Category = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    slidesToShow: 6,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="text-center px-4 py-2">
        <h1 className=" flex mb-10 ml-20  uppercase font-bold text-2xl tracking-[1px] text-cyan-700 border-b-gray-500 border-b-3 w-0 hover:w-[9.5%] translate-x-8 duration-300">Categorys</h1>
      <Slider {...settings}>
        {categery.map((data) => (
          <div
            key={data.id}
            className="flex place-items-center group"
          >
            <div className="h-[150px] w-[150px]">
              <img
                src={data.imge}
                alt={data.title}
                className="rounded-full h-full w-full object-cover mb-4"
              />
            </div>
            <Link
              to={data.navigate || "#"}
              className=" text-xl group-hover:text-cyan-600 text-center font-bold text-gray-500 tracking-[1px]"
            >
              {data.title}
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Category;
