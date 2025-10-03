import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const [active,setActive] = useState(false);
  const [open,setOpen] = useState(false);

  const {pathname} = useLocation()

  const isActive = ()=>{
    window.scrollY >0 ? setActive(true) : setActive(false)
  }

  useEffect(()=>{
    window.addEventListener("scroll",isActive);
    return()=>{
        window.removeEventListener("scroll",isActive);
    };
  },[])
  
  const currentUser={
    id:1,
    username:"Yogita",
    isSeller:true
  }


  return (
    <div className={active || pathname !=="/" ? "navbar active": "navbar"}>
        <div className="container">
            <div className="logo">
               <Link to="/" className="Link">
                <span className='text'>Hirely</span> 
               </Link>
            </div>
            <div className="links">
                <span>Hirely Business</span>
                <span>Explore</span>
                <span>English</span>
                <span>Sign in</span>
               {!currentUser?.isSeller && <span>Become a Seller</span>}
               {!currentUser && <button>Join</button>}
               {currentUser &&(
                <div className="user" onClick={()=>setOpen(!open)}>
                <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <span>{currentUser?.username}</span>
                    {open && <div className="options">
                        {currentUser?.isSeller && (
                            <>
                                <Link className="Link" to='/myGigs'>Gigs</Link>
                                <Link className="Link" to='/add'>Add New Gig</Link>
                            </>
                        )}
                        <Link className="Link" to='/orders'>Orders</Link>
                        <Link className="Link" to="/messages">Messages</Link>
                        <Link className="Link" to="/">Logout</Link>
                    </div>}
                </div>
               )}
            </div>
        </div>
        {(active || pathname !=="/")&&(
           <>
            <hr />
            <div className="menu">
                <Link className='Link menuLink' to="/">
                  Graphic & Design
                </Link>
                <Link className='Link' to="/">
                  Video & Animation
                </Link>
                <Link className='Link ' to="/">
                  Writing & Translation
                </Link>
                <Link className='Link' to="/">
                  AI Services 
                </Link>
                <Link className='Link ' to="/">
                  Digital Marketing
                </Link>
                <Link className='Link' to="/">
                  Music & Audio
                </Link>
                <Link className='Link ' to="/">
                  Programming & Tech
                </Link>
                <Link className='Link ' to="/">
                  Business
                </Link>
                <Link className='Link ' to="/">
                  Lifestyle
                </Link>
            </div>
            <hr />
           </>
        )}
    </div>
  )
}

export default Navbar
