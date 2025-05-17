import { DeleteFilled, EyeFilled } from "@ant-design/icons";
import React, { useState } from "react";
import * as Yup from "yup";

interface Review {
  id: number;
  reviewId: number;
  product: string;
  customer: string;
  rating: number;
  review: string;
  reply: string;
  date: string;
  status: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    reviewId: 23,
    product: "Product not found",
    customer: "Devid Jack",
    rating: 4,
    review: "Nice human...",
    reply: "-",
    date: "20 Nov 2022",
    status: true,
  },
  {
    id: 2,
    reviewId: 22,
    product: "Product not found",
    customer: "Robert Downey",
    rating: 5,
    review: "delivery service was good.",
    reply: "-",
    date: "20 Nov 2022",
    status: true,
  },
  {
    id: 3,
    reviewId: 21,
    product: "Product not found",
    customer: "Devid Jack",
    rating: 5,
    review: "Very good delivery service. Thank y...",
    reply: "-",
    date: "20 Nov 2022",
    status: true,
  },
  {
    id: 4,
    reviewId: 20,
    product: "Product not found",
    customer: "Robert Downey",
    rating: 5,
    review: "Delivery service was good.",
    reply: "-",
    date: "19 Nov 2022",
    status: true,
  },
  {
    id: 5,
    reviewId: 19,
    product: "Leather Ladies Bag",
    customer: "Robert Downey",
    rating: 5,
    review: "product quality was good.",
    reply: "-",
    date: "12 Oct 2022",
    status: true,
  },
  {
    id: 6,
    reviewId: 18,
    product: "Leather Ladies Bag",
    customer: "Devid Jack",
    rating: 4,
    review: "It is a long established fact that...",
    reply: "-",
    date: "12 Oct 2022",
    status: true,
  },
];

export const ReviewTable: React.FC = () => {
  const [reviewList, setReviewList] = useState<Review[]>(reviews);

  const toggleStatus = (id: number) => {
    setReviewList(
      reviewList.map((review) =>
        review.id === id ? { ...review, status: !review.status } : review,
      ),
    );
  };

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold">
          Customer Reviews List <span className="text-blue-500">23</span>
        </h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by Product or Customer"
            className="rounded border p-2 text-sm"
          />
          <button className="flex items-center rounded bg-green-600 p-2 text-sm text-white">
            <span className="mr-1">Export</span>
          </button>
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">SL</th>
            <th className="p-2">Review ID</th>
            <th className="p-2">Product</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Rating</th>
            <th className="p-2">Review</th>
            <th className="p-2">Reply</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviewList.map((review) => (
            <tr key={review.id} className="border-b">
              <td className="p-2">{review.id}</td>
              <td className="p-2">{review.reviewId}</td>
              <td className="p-2">{review.product}</td>
              <td className="p-2">{review.customer}</td>
              <td className="p-2">{renderStars(review.rating)}</td>
              <td className="p-2">{review.review}</td>
              <td className="p-2">{review.reply}</td>
              <td className="p-2">{review.date}</td>
              <td className="p-2">
                <button
                  onClick={() => toggleStatus(review.id)}
                  className={`h-6 w-12 rounded-full p-1 ${review.status ? "bg-blue-600" : "bg-gray-300"}`}
                >
                  <div
                    className={`h-4 w-4 transform rounded-full bg-white shadow-md ${
                      review.status ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </td>
              <td className="flex space-x-2 p-2">
                <button className="text-blue-500">
                  <EyeFilled />{" "}
                </button>
                <button className="text-red-500">
                  <DeleteFilled />{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to render star ratings
const renderStars = (rating: number) => {
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
  return <span className="text-yellow-400">{stars}</span>;
};
