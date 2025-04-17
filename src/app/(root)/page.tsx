import React from "react";
import Index from "./screen/Index";
import BestSelling from "./screen/BestSelling";
import NewArrival from "./screen/NewArrival";
import Banner from "./screen/Banner";
import Categories from "./screen/Categories";
import RecommendedSection from "./screen/RecommendedSection";
import SecondaryBanner from "./screen/SecondaryBanner";
import ThardBanner from "./screen/ThardBanner";
import FourthBanner from "./screen/FourthBanner";
import BestDeals from "./screen/BestDeals";

function page() {
  return (
    <div className="w-full">
      <Index />
      <div className="container mx-auto px-2 py-6 md:px-4 md:py-12">
        <Categories />
        <Banner />
        <RecommendedSection></RecommendedSection>
        <SecondaryBanner />
        <BestSelling />
        <ThardBanner />
        <NewArrival />
        <FourthBanner />
        <BestDeals />
      </div>

      
      
      
      
      

      <div className="h-screen bg-gray-5" />
    </div>
  );
}

export default page;
