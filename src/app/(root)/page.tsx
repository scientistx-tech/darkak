import React from "react";
import Index from "./screen/Index";
import BestSelling from "./screen/BestSelling";
import NewArrival from "./screen/NewArrival";
import Banner from "./screen/Banner";
import PopularProduct from "./screen/PopularProduct";
import RecentBlogs from "./screen/RecentBlogs";
import AboutUs from "./screen/AboutUs";
import Categories from "./screen/Categories";

function page() {
  return (
    <div className="w-full">
      <Index />
      <div className="container mx-auto px-2 py-6 md:px-4 md:py-12">
        <Categories />
        <Banner />
      </div>

      {/* 
      <BestSelling />
      <NewArrival />
      
      <PopularProduct />
      <RecentBlogs />
      <AboutUs /> */}

      <div className="h-screen" />
    </div>
  );
}

export default page;
