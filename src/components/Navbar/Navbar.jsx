
import React from 'react';
import "./Navbar.module.css";
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
    const { isDarkMode, setIsDarkMode } = useTheme(); 
   
 const { totalQuantity } = useCart();
    return (
        <div className={`navbar shadow-sm sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-base-100 text-black'}`}>
           
            <div className="flex-1">
                <NavLink to="/" className="btn btn-ghost text-xl">
                    <span><i className="fa-solid fa-bag-shopping text-green-600 text-3xl"></i></span>
                    <h2 className='text-2xl md:text-3xl'>ProductsGallery</h2>
                </NavLink>
            </div>

          
            <div className="flex items-center gap-4">
               
                <Link to="/cart" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <i className="fa-solid fa-cart-shopping text-2xl"></i>
                        {totalQuantity > 0 && (
                            <span className="badge badge-sm indicator-item bg-green-600 text-white">{totalQuantity}</span>
                        )}
                    </div>
                </Link>

               
                <label className="swap swap-rotate">
                    <input 
                        type="checkbox" 
                        onChange={() => setIsDarkMode(!isDarkMode)}
                        checked={isDarkMode}
                    />
                    <i className="text-3xl swap-on fa-solid fa-moon"></i>
                    <i className="text-3xl swap-off fa-solid fa-sun"></i>
                </label>
            </div>
        </div>
    );
}
