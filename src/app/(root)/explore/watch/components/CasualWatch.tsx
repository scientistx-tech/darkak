import React from 'react';
import WatchBannerCard from './WatchBannerCard';
import WatchCard from './WatchCard';

import img1 from "@/Data/Demo/watch-product-removebg-preview.png";
import img2 from "@/Data/Demo/miller-charm-rose-gold-2-600x720.jpg";

export default function CasualWatch() {
  return (
    <div className="mt-10 w-full">
      <div className="flex items-center justify-between">
        <p className="font-serif text-[35px] font-medium text-primaryBlue">Casual Watch</p>
        <button className="rounded-full bg-primaryBlue px-3 py-1.5 font-medium text-white transition-all duration-300 hover:bg-primary md:px-4 md:py-2">
          View All
        </button>
      </div>

      <div className='mt-8 flex w-full flex-col items-center justify-between gap-5 md:flex-row md:flex-wrap'>
        <WatchBannerCard />
        <WatchCard img1={img1} img2={img2} name="Miller Charm Rose Gold" price={20000} discount={30}/>
        <WatchCard img1={img1} img2={img2} name="Miller Charm Rose Gold" price={20000} discount={25}/>
        <WatchCard img1={img1} img2={img2} name="Miller Charm Rose Gold" price={20000} discount={35}/>
      </div>
    </div>
  );
}
