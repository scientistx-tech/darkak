import { motion } from "framer-motion";
import { useState } from "react";

type Review = {
    name: string;
    date: string;
    productName: string;
    rating: number;
    comment: string;
    images: string[];
};

export const ReviewCard = ({ review }: { review: Review }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <motion.div
            className="mb-4 rounded-md bg-white p-4 shadow-sm shadow-secondaryBlue"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="flex items-start w-full gap-1">
                <div className="flex flex-col items-center gap-2 w-[30%]">
                    <img
                        src="https://i.pravatar.cc/50"
                        alt="user"
                        className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="font-medium text-center">{review.name}</div>
                </div>
                <div className="flex-1 w-[70%]">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1 text-sm md:text-md lg:text-lg text-yellow-400">
                            {"★".repeat(review.rating)}
                        </div>
                    </div>
                    <div className="font-semibold text-primaryBlue">
                        Product Name: {review.productName}
                    </div>
                    <div className="mb-2 text-xs text-primaryBlue">Date: {review.date}</div>
                    <p className="text-sm text-gray-600">
                        {isExpanded ? review.comment : `${review.comment.slice(0, 100)}...`}{" "}
                        <span
                            onClick={toggleReadMore}
                            className="cursor-pointer text-primaryBlue hover:text-primaryDarkBlue"
                        >
                            {isExpanded ? "Read Less" : "Read More"}
                        </span>
                    </p>
                </div>
            </div>
            <div className="mt-3 flex gap-2 flex-wrap">
                {review.images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`screenshot-${idx}`}
                        className="h-16 w-16 rounded object-cover"
                    />
                ))}
            </div>
        </motion.div>
    );
};
