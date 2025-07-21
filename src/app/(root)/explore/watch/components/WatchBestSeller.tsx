import React from 'react';
import WatchCard from './WatchCard';

import img1 from '@/Data/Demo/watch-product-removebg-preview.png';
import img2 from '@/Data/Demo/miller-charm-rose-gold-2-600x720.jpg';

export default function WatchBestSeller() {
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center md:mt-8">
      <h1 className="font-serif text-xl font-medium text-primaryBlue md:text-[35px]">
        Watch Best Seller
      </h1>
      <p>This component will display the best-selling items in the watch category.</p>

      <div className='mt-5 w-full flex items-center justify-between'>
        <WatchCard
          href="/explore"
          img1={img1}
          img2={img2}
          name="Miller Charm Rose Gold"
          price={30000}
          discount={30}
        />
        <WatchCard
          href="/explore"
          img1={img1}
          img2={img2}
          name="Miller Charm Rose Gold"
          price={20000}
          discount={25}
        />
        <WatchCard
          href="/explore"
          img1={img1}
          img2={img2}
          name="Miller Charm Rose Gold"
          price={10000}
          discount={35}
        />
        <WatchCard
          href="/explore"
          img1={img1}
          img2={img2}
          name="Miller Charm Rose Gold"
          price={15000}
          discount={20}
        />
        
      </div>
    </div>
  );
}
