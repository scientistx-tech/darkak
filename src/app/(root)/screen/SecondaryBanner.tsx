import BannerCart from "@/components/shared/BannerCart";
import React from "react";

import img1 from "@/Data/Demo/Rectangle 130 (1).png";
import img2 from "@/Data/Demo/Rectangle 131 (1).png";

export default function SecondaryBanner() {
  return (
    <div className="mt-5 w-full space-y-6 md:mt-16">
      <div className="flex w-full flex-col gap-5 md:flex-row md:gap-10">
        <BannerCart
          bgColour="#4d4d4d"
          image={img2}
          position="right"
          title="HOT DEALS"
          description="GET 33% OFF"
          text="On SAMSUNG PHONE"
          link="/"
        />

        <BannerCart
          bgColour="#171717"
          image={img1}
          position="left"
          title="SUMMER DEALS"
          description="GET 21% OFF"
          text="On ASUS LAPTOP"
          link="/"
        />
      </div>
    </div>
  );
}
