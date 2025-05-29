

import { Link, useNavigate } from 'react-router-dom';
import { useStore } from './CartContext/Context';
import { IoCloseOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import {  FaStar,FaRegStar} from "react-icons/fa";

const Vieworder = () => {
  const { Addtocart, cortitem, RemoveOrdercart, Incrementqty, Decrementqty } = useStore();
     
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/kidswear");
  };


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

  const total = cortitem.reduce((acc, item) => acc + item.price * item.Quantity, 0);

  return (
    <>
     {/* <IoCloseOutline
          onClick={handleNavigate}
          size={40}
          className=' sticky top-5 left-5 rounded-xl bg-amber-500 hover:bg-gray-500 hover:text-white cursor-pointer z-20 mt-15'
        /> */}
        <h1 className=' text-2xl uppercase text-orange-400 font-bold p-5 pl-24'>cart list</h1>
      <section className='  flex items-center relative mt-0'>
       
        <div className='container mx-auto'>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
            {cortitem.length > 0 ? (
              cortitem.map((item) => {
                const { id, img, title, price, rating , description, Quantity , size } = item;

                return (
                  <div key={id} data-aos="fade-up" className=' p-2 rounded-xl shadow-md relative hover:shadow-gray-500'>
                    <RiDeleteBin6Line
                    data-aos="fade-left" 
                      onClick={() => RemoveOrdercart(id)}
                      size={24}
                      className='absolute top-4 right-4 text-gray-600 hover:text-red-500 cursor-pointer'
                      title='Remove from order'
                    />

                    <div className='flex justify-center mb-4 rounded-md'>
                      <img className='w-full h-60 object-contain ' src={img} alt={title} />
                    </div>

                    <h2 className='text-xl font-semibold text-center mb-2'>{title}</h2>

                    <div data-aos="fade-up" className='text-center mb-4'>
                      <h3 data-aos="fade-up" className='font-bold text-lg mb-1'>Size : {size}</h3>


                      <h1> {getStars(rating)}</h1>
                    </div>

                     <div data-aos="fade-up" className='flex justify-center items-center gap-4 mb-2'>
                      <button
                        onClick={() => Decrementqty(id)}
                        className='border rounded-xl w-10 h-10 text-2xl hover:text-red-500'
                      >
                        -
                      </button>
                      <span className='text-xl'>{Quantity}</span>
                      <button
                        onClick={() => Incrementqty(id)}
                        className='border rounded-xl w-10 h-10 text-2xl hover:text-red-500'
                      >
                        +
                      </button>
                    </div>

                    <div data-aos="fade-up" className='text-center text-red-500 text-lg font-semibold mb-2'>
                      ₹ {(price * Quantity).toFixed(2) }
                    </div>

                   

                    <p className='text-sm text-gray-600 text-center'>{description}</p>
                  </div>
                );
              })
            ) : (
              <p data-aos="fade-up" className="text-center text-gray-500 text-lg col-span-full">No items in the order.</p>
            )}
          </div>
        </div>
      </section>

      {cortitem.length > 0 && (
        <div className='flex flex-col items-center mb-6 mt-10'>
          <h2 data-aos="fade-right" className='text-2xl font-bold py-3 uppercase'>Total Price : <span className='text-red-500'> ₹ </span> {total.toFixed(2)}</h2>
          <Link
          data-aos="fade-up"
            to="/checkout"
            className='font-bold px-6 py-2 rounded-xl bg-orange-300 hover:bg-orange-500 hover:text-white'
          >
           Proced To CheckOut
          </Link>
        </div>
      )}
    </>
  );
};

export default Vieworder;
