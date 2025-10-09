import React, { useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  // ✅ Disable auto query on mount
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, sort],
    queryFn: async () => {
      const min = minRef.current?.value || 0;      // safe default
      const max = maxRef.current?.value || 10000;  // safe default
      const separator = search.includes("?") ? "&" : "?"; // ensure valid URL

      const res = await newRequest.get(
        `/gigs${search}${separator}min=${min}&max=${max}&sort=${sort}`
      );
      return res.data;
    },
    enabled: false, 
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
    refetch(); // ✅ trigger when sort changes
  };

  const apply = () => {
    refetch(); // ✅ trigger manually when Apply is clicked
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Hirely &gt; Graphics & Design &gt;</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Hirely's AI artists
        </p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>

          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src="./img/down.png"
              alt=""
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading
            ? "Loading..."
            : error
            ? (
              <p style={{ color: "red" }}>
                Something went wrong: {error.message}
              </p>
            )
            : data?.length
            ? data.map((gig) => <GigCard key={gig._id} item={gig} />)
            : "No gigs found for this filter"}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
