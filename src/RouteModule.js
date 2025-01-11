import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import BookDetails from './components/BookDetails/BookDetails';
import Login from './components/Login/Login';
import BookContainer from './components/BookContainer/BookContainer';
import Cart from './components/Cart/Cart';
import Dashboard from './components/Dashboard/Dashboard';
import Wishlist from './components/Wishlist/Wishlist';
import MyOrder from './components/MyOrder/MyOrder';
import MyProfile from './components/MyProfile/MyProfile';
import OrderSummary from './components/OrderSummary/OrderSummary';


const RouteModule = () => {
  const AppRoute = createBrowserRouter([
      //  {
      //   path: "login",
      //   element: <Login/>,
      //  },
       {
         path:"",
         element:<Dashboard/>,
         
         children:[
          {
            index: true,
            element: <Navigate to="books/1" replace />,
          },
          {
           
            path:'books/:pageNo',
            //'home/:pageNo/:sortBy',
            element:<BookContainer/>
          },
          {
            path:'bookDetails/:bookId',
            element:<BookDetails/>
          },
          {
            path:'Cart',
            element:<Cart/>
          },
          {
            path:'wishlist',
            element:<Wishlist/>
          },
          {
            path:'myOrder',
            element:<MyOrder/>
          },
          {
            path:'myProfile',
            element:<MyProfile/>
          },{
            path:'orderSummary',
            element:<OrderSummary/>
          }
         ]
       }
])
  return (
      <div className='routeModule'>
        <RouterProvider router={AppRoute}/>
      </div>
  )
}

export default RouteModule