"use client";

import BannerCart from "@/components/shared/BannerCart";
import React from "react";

import img1 from "@/Data/Demo/Rectangle 130.png";
import img2 from "@/Data/Demo/Rectangle 131.png";
import img3 from "@/Data/Demo/Rectangle 130 (1).png";
import img4 from "@/Data/Demo/Rectangle 131 (1).png";

const Banner: React.FC = () => {
  return (
    <div className="mt-5 w-full space-y-6 md:mt-16">
      <div className="flex w-full flex-col gap-5 md:flex-row md:gap-10">
        <BannerCart
          bgColour="#00153B"
          image={img1}
          position="left"
          title="SUMMER DEALS"
          description="GET 10% OFF"
          text="On ASUS LAPTOP"
          link="/"
        />
        <BannerCart
          bgColour="#323232"
          image={img2}
          position="right"
          title="HOT DEALS"
          description="GET 13% OFF"
          text="On SAMSUNG PHONE"
          link="/"
        />
      </div>

      <div className="flex w-full flex-col gap-5 md:flex-row md:gap-10">
        <BannerCart
          bgColour="#5694FF"
          image={img4}
          position="right"
          title="HOT DEALS"
          description="GET 33% OFF"
          text="On SAMSUNG PHONE"
          link="/"
        />

        <BannerCart
          bgColour="#07d38b"
          image={img3}
          position="left"
          title="SUMMER DEALS"
          description="GET 21% OFF"
          text="On ASUS LAPTOP"
          link="/"
        />
      </div>
    </div>
  );
};

export default Banner;
