import React from 'react';
import WatchSlider from './components/WatchSlider';
import CasualWatch from './components/CasualWatch';
import PremiumWatch from './components/PremiumWatch';
import WatchCategories from './components/WatchCategories';
import WatchBrand from './components/WatchBrand';
import WatchBestSeller from './components/WatchBestSeller';
import WatchPoster from './components/WatchPoster';
import WatchTestimonial from './components/WatchTestimonial';
import WatchNewArrival from './components/WatchNewArrival';

export default function page() {
  return (
    <div>
      <div className="h-[65px] w-full xl:h-[109px]" />
      <WatchSlider />

      <div className="container mx-auto flex flex-col gap-y-5 px-2 md:px-4">
        <CasualWatch />
        <PremiumWatch />
        <WatchCategories />
        <WatchBrand />
        <WatchBestSeller />
        <WatchPoster />
        <WatchNewArrival />
        <WatchTestimonial />
      </div>
    </div>
  );
}
