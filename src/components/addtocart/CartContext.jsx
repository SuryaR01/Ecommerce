

import React, { useContext } from 'react';
import { createContext , useState } from 'react';
import Hero from '../Hero/Hero';
// import Context from '../../Multipages/CartContext/Context'; 

import Kidswear from '../../Multipages/Kidswear';

const Cartpage = () => {

   const { addtocart } = useContext(Kidswear)
  return (
    <div className='  '>
           <Hero/>

           <div className="w-full mb-20 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left border-collapse">
            <thead className="bg-orange-500 text-white text-sm md:text-base">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Total</th>
                <th className="p-3">Edit</th>
              </tr>
            </thead>
            <tbody>
              {addtocart.map((item) => (
                <tr key={item.id} className="border-b text-sm md:text-base">
                  <td className="p-4 flex items-center gap-4 min-w-[180px]">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span className="font-semibold">{item.name}</span>
                  </td>
                  <td className="p-4 font-medium">₹{item.price}</td>
                  <td className="p-4">
                    <div className="flex items-center border rounded w-fit">
                      <button
                        // onClick={() => handleDecrease(item)}
                        className="px-3 py-1 hover:bg-orange-500 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-4 border-l border-r">
                        {item.quantity}
                      </span>
                      <button
                        // onClick={() => handleIncrease(item)}
                        className="px-3 py-1 hover:bg-orange-500 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-4 font-medium">
                    {/* ₹{calculateTotalPrice(item).toFixed(2)} */}
                  </td>
                  <td className="p-4">
                    <button
                      // onClick={() => handleRemoveItem(item)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

    </div>
  )
}

export default Cartpage