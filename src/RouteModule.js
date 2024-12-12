import React from 'react'
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import BookCard from './components/BookCard/BookCard'
import BookDetails from './components/BookDetails/BookDetails';
import Login from './components/Login/Login';
import BookContainer from './components/BookContainer/BookContainer';
import Cart from './components/Cart/Cart';
import Dashboard from './components/Dashboard/Dashboard';


const RouteModule = () => {
  const AppRoute = createBrowserRouter([
       {
        path: "login",
        element: <Login/>,
       },
      //  {
      //   path: "/cart",
      //   element: <Cart/>,
      //  },
       {
         path:"",
         element:<Dashboard/>,
         children:[
          {
            path:'bookContainer',
            element:<BookContainer/>
          },
          {
            path:'bookDetails/:bookId',
            element:<BookDetails/>
          },
          {
            path:'Cart',
            element:<Cart/>
          }
         ]
       }
])
  return (
    
      <div className='routeModule'>
       {/* <Header/> 
       <div style={{display:'flex', flexWrap:'wrap',gap:'20px',paddingLeft:'160px',marginTop:'20px',marginBottom:'20px'}}>
       <BookCard/>
       <BookCard/>
       <BookCard/>
       <BookCard/>
       <BookCard/>
       <BookCard/>
       <BookCard/>
       <BookCard/>
       <BookCard/>
       <BookCard/>
       <BookCard/>
       </div>
       <Footer/>  
      
      <BookDetails/>
      <Login/> */}
      {/* <Login/> */}
    <RouterProvider router={AppRoute}/>

     </div>
  )
}

export default RouteModule