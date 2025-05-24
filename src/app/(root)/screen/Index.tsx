"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import img1 from "@/Data/Demo/Product-banner-1.jpg";
import img2 from "@/Data/Demo/Product-banner-2.jpg";
import img3 from "@/Data/Demo/Product-banner-3.webp";
import { useGetPublicSlidersQuery } from "@/redux/services/client/sliderApis";
import ClientLoading from "../components/ClientLoading";

// Slide data: image + text per slide
const slides = [
  {
    banner: img1,
    offer_name: "Save Up to 30% on First Purchase",
    details: "Unlocking the Power of Connection",
    title: "HOT DEALS AVAILABLE",
    // button: "Discover More",
  },
  {
    banner: img2,
    offer_name: "Upgrade Your Lifestyle Today",
    details: "Smart gadgets at unbeatable prices",
    title: "LIMITED TIME OFFER",
  },
  {
    banner: img3,
    offer_name: "Tech that Empowers You",
    details: "Explore innovation with every click",
    ttile: "EXCLUSIVE LAUNCH",
    // button: "Explore Deals",
  },
];

const Slider: React.FC = () => {
  const {
    data: sliderData,
    error,
    isLoading,
    refetch,
  } = useGetPublicSlidersQuery({ type: "slider" });

  // console.log(sliderData, "slider data");

  const finalSlides = sliderData?.length > 0 ? sliderData : [];

  const [index, setIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (!finalSlides || finalSlides?.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % finalSlides?.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [finalSlides]);

  useEffect(() => {
    if (index >= (finalSlides?.length || 0)) {
      setIndex(0);
    }
  }, [finalSlides, index]);

  const handleDotClick = (i: number) => {
    setIndex(i);
  };

  const current = finalSlides && finalSlides[index];

  if (isLoading) return <ClientLoading></ClientLoading>;

  return (
    <div className="w-full overflow-hidden bg-[#E6EFFF] font-montserrat">
      <div className="flex flex-col items-center gap-8 px-6 py-12 md:h-[calc(100vh-150px)] md:flex-row md:justify-between md:px-16">
        {/* mobile screen */}
        <div className="flex-1 md:hidden">
          {current?.banner ? (
            <Image
              src={current.banner}
              alt={`Slide ${index}`}
              className="h-[200px] w-full rounded-xl object-contain md:h-[400px]"
              width={400}
              height={200}
              priority
            />
          ) : (
            <div className="flex h-[200px] items-center justify-center text-gray-500 md:h-[400px]">
              No image
            </div>
          )}
        </div>

        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-black">
            {current?.offer_name}
          </h4>
          <h1 className="mt-4 text-4xl font-medium text-gray-800 md:h-[100px] md:text-5xl">
            {current?.title}
          </h1>
          <p className="text-lg text-gray-700 md:mt-4">{current?.details}</p>
          <button className="mt-3 rounded-full bg-[#003084] px-6 py-2 font-semibold text-white transition hover:bg-blue-600 md:mt-6">
            Explore More
          </button>

          <p className="absolute left-[20%] mt-[62px] hidden font-montserrat text-[150px] text-white md:block">
            {" "}
            {index + 1}
          </p>
        </div>

        {/* Right Image */}
        <div className="hidden flex-1 md:block">
          {current?.banner ? (
            <Image
              src={current.banner}
              alt={`Slide ${index}`}
              className="h-[200px] w-full rounded-xl object-contain md:h-[400px]"
              width={400}
              height={200}
              priority
            />
          ) : (
            <div className="flex h-[200px] items-center justify-center text-gray-500 md:h-[400px]">
              No image
            </div>
          )}
        </div>
      </div>

      {/* Dots */}
      <div className="md:mt-4 flex justify-center pb-6">
        {finalSlides?.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`mx-1 h-3 w-3 rounded-full transition-all duration-300 ${
              i === index ? "scale-110 bg-[#003084]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
