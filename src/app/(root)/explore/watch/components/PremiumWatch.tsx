import React from 'react'
import WatchBannerCard from './WatchBannerCard';
import WatchCard from './WatchCard';

import img1 from "@/Data/Demo/watch-product-removebg-preview.png";
import img2 from "@/Data/Demo/miller-charm-rose-gold-2-600x720.jpg";
import img3 from '@/Data/Demo/thumb-1920-479220.jpg';

export default function PremiumWatch() {
  return (
    <div className="mt-0 md:mt-10 w-full">
          <div className="flex items-center justify-between">
            <p className="font-serif text-xl md:text-[35px] font-medium text-primaryBlue">Premium Watch</p>
            <button className="rounded-full hover:bg-primaryBlue px-3 py-1.5 font-medium text-white transition-all duration-300 bg-primary md:px-4 md:py-2">
              View All
            </button>
          </div>
    
          <div className='mt-0 md:mt-8 md:flex w-full items-center justify-between gap-2 md:gap-5 md:flex-row md:flex-wrap grid grid-cols-2'>
            <WatchBannerCard href="/explore"  img={img3} text="Casual Confidence" name="One Tick at a Time"/>
            <WatchCard href="/explore" img1={img1} img2={img2} name="Miller Charm Rose Gold" price={30000} discount={30}/>
            <WatchCard href="/explore"  img1={img1} img2={img2} name="Miller Charm Rose Gold" price={20000} discount={25}/>
            <WatchCard href="/explore"  img1={img1} img2={img2} name="Miller Charm Rose Gold" price={10000} discount={35}/>
          </div>
        </div>
  )
}
