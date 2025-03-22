import HotCard from "@/components/shared/HotCard";
import React from "react";

import Img1 from "@/Data/Demo/iPad-Air-M3---2025-1259.jpg";
import Img2 from "@/Data/Demo/iPad-Air-M3---2025-purple-1209.jpg";
import Img3 from "@/Data/Demo/iPad-Air-M3---2025-space-gray-3684.jpg";
import Img4 from "@/Data/Demo/iPad-Air-M3---2025-starlight-2313.jpg";

const HotDeals: React.FC = () => {
  return (
    <div className="w-full">
      <p className="mt-10 text-2xl font-semibold uppercase text-primary md:mt-16 md:text-3xl">
        Hot <samp className="text-secondary">Deals</samp>
      </p>

      <div className="mt-10 grid grid-flow-col gap-3">
        <HotCard
          name="iPad Air M3 - 2025"
          categories="Product"
          regularPrice={80200}
          discount={20}
          status="In Stock"
          description="Go beyond during every creative project with Apple iPad Air M3. One of the slimmest designs with premium colors looks fashionable and aesthetic at the same time. Get gorgeous visuals from the large 11-inch or 13-inch model, which has Wide Color (P3) supported for immersive viewing."
          mainImage={Img1}
          image1={Img2}
          image2={Img3}
          image3={Img4}
          rating={3.5}
          reviews={10}
          cartLink=""
          buyLink=""
          favoriteLink=""
        />

<HotCard
          name="iPad Air M3 - 2025"
          categories="Product"
          regularPrice={80200}
          discount={20}
          status="In Stock"
          description="Go beyond during every creative project with Apple iPad Air M3. One of the slimmest designs with premium colors looks fashionable and aesthetic at the same time. Get gorgeous visuals from the large 11-inch or 13-inch model, which has Wide Color (P3) supported for immersive viewing."
          mainImage={Img1}
          image1={Img2}
          image2={Img3}
          image3={Img4}
          rating={3.5}
          reviews={10}
          cartLink=""
          buyLink=""
          favoriteLink=""
        />
        <HotCard
          name="iPad Air M3 - 2025"
          categories="Product"
          regularPrice={80200}
          discount={20}
          status="In Stock"
          description="Go beyond during every creative project with Apple iPad Air M3. One of the slimmest designs with premium colors looks fashionable and aesthetic at the same time. Get gorgeous visuals from the large 11-inch or 13-inch model, which has Wide Color (P3) supported for immersive viewing."
          mainImage={Img1}
          image1={Img2}
          image2={Img3}
          image3={Img4}
          rating={3.5}
          reviews={10}
          cartLink=""
          buyLink=""
          favoriteLink=""
        />
        {/* <HotCard />

        <HotCard /> */}
      </div>
    </div>
  );
};

export default HotDeals;
