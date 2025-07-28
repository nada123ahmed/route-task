

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams(); 
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const { data: product, isLoading, isError, error } = useQuery({
   
    queryKey: ['product', id], 
    queryFn: async () => {
      const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return data;
    }
  });

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-center p-10 text-red-500">Error: {error.message}</div>;
 const handleAddToCartClick = (e, product) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        addToCart(product);
        
        console.log(`${product.title} added to cart!`);
    };
  return (
    <>
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex justify-center items-center">
          <img src={product.image} alt={product.title} className={`max-h-96 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} />
        </div>
        <div className="md:w-2/3">
          <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded-full">{product.category}</span>
          <h1 className="text-3xl font-bold my-4">{product.title}</h1>
          <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.description}</p>
          <div className="flex items-center gap-4 mb-4">
             <span className="text-3xl font-bold text-green-600">${product.price}</span>
             <span className="text-yellow-500">
               <i class="fa-solid fa-star text-yellow-400"></i> {product.rating.rate} ({product.rating.count} reviews)
             </span>
          </div>
           <button onClick={(e) => handleAddToCartClick(e, product)}  className='bg-green-600 text-white px-4 py-2 rounded-lg w-full my-4 cursor-pointer'>Add To cart</button>
        </div>
      </div>
    </div>
    
    </>
  );
}
