import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from 'react-router-dom';


const Featured = () => {
  const [input,setInput] = useState("");
  const navigate = useNavigate()
  const handleSubmit = ()=>{
    navigate(`/gigs?search=${input}`)
  }
  return (
    <div className='featured'>
      <div className="container">
        <div className="left">
         <h1>Hire skilled <i>freelancers</i> to elevate your business</h1>
         <div className="search">
           <div className="searchInput">
            <img src="./img/search.png" alt="" />
            <input type="text" placeholder="Find a UI/UX designer…"
            onChange={(e)=> setInput(e.target.value)} />
           </div> 
           <button onClick={handleSubmit}>Search</button>
         </div>
         <div className="popular">
            <span>Popular:</span>
            <button>App Development</button>
            <button>Game development</button>
            <button>Logo & Brand Design</button>   
            <button>SEO & Digital Marketing</button>
         </div>
        </div>
        <div className="right">
            <img src="./img/women.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
