import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();

  // Fetch reviews
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  // Mutation to add review
  const mutation = useMutation({
    mutationFn: (review) => newRequest.post("/reviews", review),
    onSuccess: () => queryClient.invalidateQueries(["reviews", gigId]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = parseInt(e.target[1].value);
    mutation.mutate({ gigId, desc, star });
    e.target.reset();
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>

      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong!"
        : data.map((review) => (
            <Review key={review._id} review={review} user={review.userId} />
          ))}

      <div className="add">
        <h3>Add a review</h3>
        <form className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="Write your opinion" required />
          <select required>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Sending..." : "Send"}
          </button>
          {mutation.isError && <p>Error submitting review</p>}
        </form>
      </div>
    </div>
  );
};

export default Reviews;
