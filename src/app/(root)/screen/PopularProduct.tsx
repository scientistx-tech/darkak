"use client";

import React from "react";

const PopularProduct: React.FC = () => {
  return (
    <div className="w-full">
      <p className="mt-10 text-2xl font-semibold uppercase text-primary md:mt-16 md:text-3xl">
        Popular <samp className="text-secondary">Products</samp>
      </p>
    </div>
  );
};

export default PopularProduct;
