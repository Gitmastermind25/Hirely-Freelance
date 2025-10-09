import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", item.userId],
    queryFn: async () => {
      try {
        const res = await newRequest.get(`/users/${item.userId}`);
        return res.data;
      } catch (err) {
        console.error("Failed to fetch user:", err);
        return null; 
      }
    },
    retry: false, // prevent automatic retries if user is missing
  });

  const avgStars =
    !isNaN(item.totalStars / item.starNumber)
      ? Math.round(item.totalStars / item.starNumber)
      : 0;

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt={item.title || "Gig Cover"} />
        <div className="info">
          <div className="user">
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <img src={data?.img || "/img/noavatar.jpg"} alt={data?.username || "User"} />
                <span>{data?.username || "Seller"}</span>
              </>
            )}
          </div>

          <p>{item.desc}</p>

          <div className="star">
            <img src="./img/star.png" alt="star" />
            <span>{avgStars}</span>
          </div>
        </div>

        <hr />

        <div className="detail">
          <img src="./img/heart.png" alt="heart" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
