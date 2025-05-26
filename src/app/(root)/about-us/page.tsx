import React from "react";
import AboutUsPage from "./AboutUsPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Us"
};
export default function page() {
  return (
    <div>
      <div className="h-[65px] w-full md:h-[109px]" />
      <AboutUsPage />
    </div>
  );
}
