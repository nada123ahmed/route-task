

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import ProductsGallery from './components/ProductsGallery/ProductsGallery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
function App() {
   const queryClient = new QueryClient();
 let routes =createBrowserRouter([{
 path:"" ,element:<Layout/>,
    children:[{
      index:true,element:<ProductsGallery/>
    },
  {
    path:"products/:id",element:<ProductDetails/>
  },
  {path:"Cart",element:<Cart/>}
  ]
}])
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={routes}/>
     <ReactQueryDevtools initialIsOpen={false}/>
     </QueryClientProvider>
    </>
  )
}

export default App
