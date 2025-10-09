import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Scroll effect
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Logout function
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="Link">
            <span className="text">Hirely</span>
          </Link>
        </div>

        {/* Links */}
        <div className="links">
          <span>Hirely Business</span>
          <span>Explore</span>
          <span>English</span>

          {!currentUser?.isSeller && <span>Become a Seller</span>}

          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={currentUser.img || "/img/noavatar.jpg"}
                alt="user"
              />
              <span>{currentUser.username}</span>

              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="Link" to="/myGigs">
                        Gigs
                      </Link>
                      <Link className="Link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="Link" to="/orders">
                    Orders
                  </Link>
                  <Link className="Link" to="/messages">
                    Messages
                  </Link>
                  <Link className="Link" onClick={handleLogout} to="/">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="Link">
                Sign in
              </Link>
              <Link className="Link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Category menu */}
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="Link menuLink" to="/">
              Graphic & Design
            </Link>
            <Link className="Link" to="/">
              Video & Animation
            </Link>
            <Link className="Link" to="/">
              Writing & Translation
            </Link>
            <Link className="Link" to="/">
              AI Services
            </Link>
            <Link className="Link" to="/">
              Digital Marketing
            </Link>
            <Link className="Link" to="/">
              Music & Audio
            </Link>
            <Link className="Link" to="/">
              Programming & Tech
            </Link>
            <Link className="Link" to="/">
              Business
            </Link>
            <Link className="Link" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
