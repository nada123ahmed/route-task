
import React, { useState, useContext, createContext, useMemo } from 'react';


const CartContext = createContext();


export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const isItemInCart = prevItems.find(item => item.id === product.id);

            if (isItemInCart) {
              
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
            }
         
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

   
    const increaseQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    
    const decreaseQuantity = (productId) => {
        setCartItems(prevItems => {
            const itemToDecrease = prevItems.find(item => item.id === productId);
            if (itemToDecrease?.quantity === 1) {
                return prevItems.filter(item => item.id !== productId);
            }
            return prevItems.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };
    
    const totalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cartItems]);
const totalQuantity = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

   
    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            totalPrice,
            increaseQuantity,
            decreaseQuantity,
            totalQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
}


export const useCart = () => useContext(CartContext);