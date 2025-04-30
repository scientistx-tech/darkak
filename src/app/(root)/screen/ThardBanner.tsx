


import BannerCart from "@/components/shared/BannerCart";
import React from "react";

import img1 from "@/Data/Demo/Rectangle 130 (1).png";
import img2 from "@/Data/Demo/Rectangle 131 (1).png";

export default function ThardBanner() {
  return (
    <div className="mt-5 w-full space-y-6 md:mt-16">
      <div className="flex w-full flex-col gap-0 md:flex-row md:gap-10">
        <BannerCart
          bgColour="#5694FF"
          image={img2}
          position="left"
          title="HOT DEALS"
          description="GET 33% OFF"
          text="On SAMSUNG PHONE"
          link="/"
        />

        <BannerCart
          bgColour="#07d38b"
          image={img1}
          position="right"
          title="SUMMER DEALS"
          description="GET 21% OFF"
          text="On ASUS LAPTOP"
          link="/"
        />
      </div>
    </div>
  );
}

