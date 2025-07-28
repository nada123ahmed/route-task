
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import cartisempty from "../../assets/images/2eacfa305d7715bdcd86bb4956209038.jpg";
import "./Cart.module.css"
export default function CartPage() {
   
    const { cartItems, removeFromCart, clearCart, totalPrice, increaseQuantity, decreaseQuantity } = useCart();
    const { isDarkMode } = useTheme();

   
    if (cartItems.length === 0) {
        return (
            <div className="text-center p-10 flex flex-col justify-center items-center h-[80vh]">
                <img src={cartisempty} alt="Empty Cart" className="h-screen object-contain mb-4" />
                <p className="mb-6 text-xl">No Products have been Added</p>
                <Link to="/" className="btn bg-green-600 hover:bg-green-700 text-white">
                    Back To shopping
                </Link>
            </div>
        );
    }

    
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Items In cart:</h1>
            <div className="flex flex-col lg:flex-row gap-8">
               
                <div className="lg:w-2/3 space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className={`flex items-center gap-4 p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain rounded" />
                            <div className="flex-grow">
                                <h2 className="font-bold">{item.title}</h2>
                            </div>
                       
                            <div className='mx-auto flex items-center gap-4'>
                                <button onClick={() => increaseQuantity(item.id)} className='border-2 border-green-600 w-8 h-8 flex items-center justify-center text-lg rounded-full cursor-pointer hover:bg-green-600 hover:text-white transition-colors'>+</button>
                                <span className="font-bold text-lg w-4 text-center">{item.quantity}</span>
                                <button onClick={() => decreaseQuantity(item.id)} className='border-2 border-green-600 w-8 h-8 flex items-center justify-center text-lg rounded-full cursor-pointer hover:bg-green-600 hover:text-white transition-colors'>-</button>
                            </div>
                         
                            <div className="text-lg font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</div>
                            <button onClick={() => removeFromCart(item.id)} className="btn btn-ghost btn-sm text-red-500">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ))}
                </div>

             
                <div className="lg:w-1/3">
                    <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className="text-2xl font-bold mb-4">Total</h2>
                        <div className="flex justify-between font-bold text-xl mb-6">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="btn w-full bg-green-600 hover:bg-green-700 text-white mb-2">
                            Check Out
                        </button>
                        <button onClick={clearCart} className="btn btn-ghost w-full text-red-500">
                            Empty Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
