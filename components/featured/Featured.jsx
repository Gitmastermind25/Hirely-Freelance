import React from "react";
import "./Featured.scss";


const Featured = () => {
  return (
    <div className='featured'>
      <div className="container">
        <div className="left">
         <h1>Hire skilled <i>freelancers</i> to elevate your business</h1>
         <div className="search">
           <div className="searchInput">
            <img src="./img/search.png" alt="" />
            <input type="text" placeholder="Find a UI/UX designer…" />
           </div> 
           <button>Search</button>
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
