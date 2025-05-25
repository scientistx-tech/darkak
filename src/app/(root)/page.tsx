"use client";

import React from "react";
import Index from "./screen/Index";
import BestSelling from "./screen/BestSelling";
import NewArrival from "./screen/NewArrival";
import Banner from "./screen/Banner";
import Categories from "./screen/Categories";
import RecommendedSection from "./screen/RecommendedProducts";
import SecondaryBanner from "./screen/SecondaryBanner";
import ThardBanner from "./screen/ThardBanner";
import FourthBanner from "./screen/FourthBanner";
import BestDeals from "./screen/BestDeals";
import MotionRevealWrapper from "./components/MotionRevealWrapper";
import MostVisitedProducts from "./screen/MostVisitedProducts";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FeatureSection from "./screen/FeatureSection";

function Page() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="w-full">
      <div className="h-[65px] w-full bg-[#E6EFFF] md:h-[109px]" />

      <MotionRevealWrapper>
        <Index />
      </MotionRevealWrapper>

      <MotionRevealWrapper>
        <Categories />
      </MotionRevealWrapper>

      <div className="container mx-auto flex flex-col gap-y-5 px-2 md:px-4">
        <MotionRevealWrapper>
          <Banner />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <RecommendedSection />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <SecondaryBanner />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <MostVisitedProducts visitorId={"dfa"} />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <BestSelling />
        </MotionRevealWrapper>

        {/* <MotionRevealWrapper>
          <ThardBanner />
        </MotionRevealWrapper> */}

        <MotionRevealWrapper>
          <NewArrival />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <FourthBanner />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <BestDeals />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <FeatureSection />
        </MotionRevealWrapper>
      </div>
    </div>
  );
}

export default Page;
