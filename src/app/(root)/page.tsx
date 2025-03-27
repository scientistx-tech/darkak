import React from "react";
import Index from "./screen/Index";
import HotDeals from "./screen/HotDeals";
import BestSelling from "./screen/BestSelling";
import NewArrival from "./screen/NewArrival";
import Banner from "./screen/Banner";
import PopularProduct from "./screen/PopularProduct";
import RecentBlogs from "./screen/RecentBlogs";
import AboutUs from "./screen/AboutUs";

function page() {
  return (
    <div className="w-full">
      <Index />
      <HotDeals />
      <BestSelling />
      <NewArrival />
      <Banner />
      <PopularProduct />
      <RecentBlogs />
      <AboutUs />
    </div>
  );
}

export default page;
