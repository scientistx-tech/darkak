"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useGetPublicSlidersQuery } from "@/redux/services/client/sliderApis";
import ClientLoading from "../components/ClientLoading";
import Link from "next/link";

const Slider: React.FC = () => {
  const {
    data: sliderData,
    error,
    isLoading,
    refetch,
  } = useGetPublicSlidersQuery({ type: "slider" });

  console.log(sliderData, "slider data");

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
    <div className="w-full overflow-hidden bg-primaryBlue text-white">
      <div className="w-full md:h-[calc(100vh-150px)]">
        <div className="w-full h-[2px] bg-primary"/>

      <div className="flex flex-col items-center gap-8 px-6 py-12 md:flex-row md:justify-between md:px-16 ">

      </div>
      </div>

      <div className="flex justify-center pb-6 md:mt-4">
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
