import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { ThemeProvider } from './context/ThemeContext.jsx'
import { TokenContextProvider } from './context/TokenContext.jsx'

import { CartProvider } from './context/CartContext.jsx';
createRoot(document.getElementById('root')).render(
    <StrictMode>
       
        <TokenContextProvider>
     
            <CartProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </CartProvider>
        </TokenContextProvider>
    </StrictMode>
  
)
