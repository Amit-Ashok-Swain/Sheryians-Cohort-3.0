import React, { useContext, useState } from 'react';
import { MyStore } from '../context/MyContext';

const ProductCard = ({ product}) => {
  const { title, price, description, category, image, rating } = product;

  let {setCartItems} = useContext(MyStore);

  return (
    <div className="flex flex-col bg-gray-500 rounded-2xl shadow-sm border border-black-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
      
      {/* Image Container */}
      <div className="relative h-64 w-full bg-gray-400 p-6 flex justify-center items-center group">
        <img 
          src={image} 
          alt={title} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {/* Optional Category Badge overlay */}
        <span className="absolute top-4 left-4 bg-yellow-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow border-t border-gray-50">
        
        {/* Title */}
        <h3 className="text-lg font-bold text-black mb-2 line-clamp-2" title={title}>
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-black mb-4 line-clamp-3 flex-grow">
          {description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1 text-sm font-bold text-black">{rating.rate}</span>
          <span className="ml-1 text-sm text-black">({rating.count} reviews)</span>
        </div>
        
        {/* Footer: Price & Action */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black">
          <span className="text-2xl font-black text-green-400">
            ${price.toFixed(2)}
          </span>
          <button onClick={()=>setCartItems((prev)=>[...prev,product])}
           className="bg-black cursor-pointer hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;