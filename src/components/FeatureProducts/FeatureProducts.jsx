
import React, { useMemo, useState } from 'react';
import "./FeatureProducts.module.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '../../context/ThemeContext';
import Loader from '../Loader/Loader';
import { useCart } from '../../context/CartContext';

export default function FeatureProducts() {
    const { addToCart } = useCart();
    const { isDarkMode } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('');

    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axios.get('https://fakestoreapi.com/products');
            return data;
        }
    });

    const displayedProducts = useMemo(() => {
        if (!products) return [];
        let filtered = [...products].filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (sortType === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortType === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortType === 'name-asc') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }
        return filtered;
    }, [products, searchTerm, sortType]);

    if (isError) {
        return <div className="text-center p-10 text-red-500">Error: {error.message}</div>;
    }
    
   
    const handleAddToCartClick = (e, product) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        addToCart(product);
      
        console.log(`${product.title} added to cart!`);
    };

    return (
        <div className="container mx-auto p-4">
           
            <div className="flex flex-col md:flex-row gap-4 my-8">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className={`input input-bordered w-full md:w-1/2 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className={`select select-bordered w-full md:w-1/2 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                    onChange={(e) => setSortType(e.target.value)}
                    value={sortType}
                >
                    <option value="">Sort by</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="name-asc">Name (A–Z)</option>
                </select>
            </div>

            {isLoading ? (
                <Loader />
            ) : displayedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayedProducts.map((product) => (
                        <div key={product.id} className="product-card-wrapper">
                             <div className={`card shadow-xl h-full flex flex-col justify-between transition-transform duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-base-100 text-gray-900'}`}>
                                <Link to={`/products/${product.id}`} className="flex flex-col flex-grow">
                                    <figure className="px-10 pt-10 h-48 flex items-center justify-center">
                                        <img src={product.image} alt={product.title} className="rounded-xl max-h-full max-w-full object-contain" />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title h-16 text-sm">{product.title}</h2>
                                        <p className="font-bold text-lg text-green-500">${product.price}</p>
                                    </div>
                                </Link>
                                <div className="card-actions p-4 pt-0">
                                   
                                    <button 
                                        onClick={(e) => handleAddToCartClick(e, product)} 
                                        className='btn bg-green-600 hover:bg-green-700 text-white w-full'
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-10">
                    <p>No products found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
