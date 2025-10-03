import React from "react";
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import MyGigs from './pages/myGigs/MyGigs';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import Gigs from './pages/gigs/Gigs';
import Add from './pages/add/Add';
import Orders from './pages/orders/Orders';
import Gig from './pages/gig/Gig';
import "./App.scss";
import{ createBrowserRouter,Outlet,RouterProvider }from "react-router-dom";

function App() {
  const Layout = ()=>{
    return(
      <div className="app">
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    )
  }  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/gigs",
          element:<Gigs/>
        },
        {
          path:"/gig/:id",
          element:<Gig/>
        },
        {
          path:"/Orders",
          element:<Orders/>
        }, 
        {
          path:"/myGigs",
          element:<MyGigs/>
        },
        {
          path:"/add",
          element:<Add/>
        },
        {
          path:"/messages",
          element:<Messages/>
        },
        {
          path:"/message/:id",
          element:<Message/>
        },
      ]
    },
  ]);

  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  )
}

export default App
