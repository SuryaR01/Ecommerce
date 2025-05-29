

import { useStore } from './CartContext/Context';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import { GiAngryEyes } from "react-icons/gi";
import { Link } from 'react-router-dom';


const Favorite = () => {
  const { favitem, removeFromFavorites, Addtocart } = useStore();

  return (
    <div className="container mx-auto px-4 py-6 pt-25">
      <h2 className="text-2xl font-bold mb-4 text-center">My Favorites</h2>

      {favitem.length === 0 ? (
        <p className="text-center text-gray-500">No favorite items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favitem.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-72 object-cover p-2 rounded-2xl"
              />
              <div className="p-4 space-y-2 relative group">
                <h3 data-aos="fade-left"  data-aos-duration = "500" className="text-lg font-semibold">{item.title}</h3>
                <p data-aos="fade-left"  data-aos-duration = "600" className="text-gray-500 dark:text-gray-300">Color: {item.color}</p>
                <p data-aos="fade-left"  data-aos-duration = "600" className="text-gray-500 dark:text-gray-300">Rating: {item.rating}</p>
                <p data-aos="fade-left"  data-aos-duration = "700" className="text-orange-500 font-bold"> ₹ {item.price}</p>

                <div className="flex justify-between items-center pt-2">
                  {/* Add to Cart Button */}
                  <Link
                    // to={"/viewcart"}
                    data-aos="fade-left"  data-aos-duration = "900"
                    onClick={() => Addtocart(item)}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded-full text-sm transition-colors"
                  >
                    <FaCartPlus />
                    Add to Cart
                  </Link>

                  {/* Remove from Favorites Button */}
                  <button
                  data-aos="fade-left"  data-aos-duration = "1000"
                    onClick={() => removeFromFavorites(item.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm transition-colors"
                  >
                    <RiDeleteBin6Line />
                    Remove
                  </button>

                </div>
                
                  {/* <Link  
                   to={`/favorite/${item.id}`} 
                  className=' absolute -right-10 bottom-15 hover:text-red-500 group-hover:right-8 transition-all duration-500'>
                      <GiAngryEyes size={45}/>
                  </Link> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;



