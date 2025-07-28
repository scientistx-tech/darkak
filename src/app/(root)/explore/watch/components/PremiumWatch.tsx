import React from 'react';
import WatchBannerCard from './WatchBannerCard';
import WatchCard from './WatchCard';

import img1 from '@/Data/Demo/watch-product-removebg-preview.png';
import img2 from '@/Data/Demo/miller-charm-rose-gold-2-600x720.jpg';
import img3 from '@/Data/Demo/thumb-1920-479220.jpg';
import { WatchBanner } from '../types';

export default function PremiumWatch({ banner }: { banner: WatchBanner | undefined }) {
  return (
    <div className="mt-0 w-full md:mt-10">
      <div className="flex items-center justify-between">
        <p className="font-serif text-xl font-medium text-primaryBlue md:text-[35px]">
          Premium Watch
        </p>
        <button className="rounded-full bg-primary px-3 py-1.5 font-medium text-white transition-all duration-300 hover:bg-primaryBlue md:px-4 md:py-2">
          View All
        </button>
      </div>

      <div className="mt-0 grid w-full grid-cols-2 items-center justify-between gap-2 md:mt-8 md:flex md:flex-row md:flex-wrap md:gap-5">
        {banner && (
          <WatchBannerCard
            href={`/product/${banner?.product.slug}`}
            img={banner.image}
            alt={banner.alt}
            text={banner?.description}
            name={banner.title}
          />
        )}
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
      </div>
    </div>
  );
}
