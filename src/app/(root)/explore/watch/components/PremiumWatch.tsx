import React from 'react';
import WatchBannerCard from './WatchBannerCard';
import WatchCard from './WatchCard';

import img1 from '@/Data/Demo/watch-product-removebg-preview.png';
import img2 from '@/Data/Demo/miller-charm-rose-gold-2-600x720.jpg';
import img3 from '@/Data/Demo/thumb-1920-479220.jpg';
import { SellerProductResponse, WatchBanner } from '../types';

export default async function PremiumWatch({ banner }: { banner: WatchBanner | undefined }) {
  const data = await fetchSellerProducts();
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
        {data?.data?.map((d) => (
          <WatchCard
            key={d.id}
            href={`/product/${d.product.slug}`}
            img1={d.thumbnail}
            img2={d.additional}
            name={d.title}
            discountType={d.product.discount_type}
            img1Alt={d.thumbnail_alt}
            img2Alt={d.additional_alt}
            price={d.product.price}
            discount={d.product.discount}
          />
        ))}
      </div>
    </div>
  );
}
const fetchSellerProducts = async (): Promise<SellerProductResponse> => {
  const res = await fetch('https://api.darkak.com.bd/api/public/watch-products/premium');
  return res.json();
};
