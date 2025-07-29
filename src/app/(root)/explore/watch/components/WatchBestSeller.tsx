'use client';
import React from 'react';
import WatchCard from './WatchCard';
import img1 from '@/Data/Demo/watch-product-removebg-preview.png';
import img2 from '@/Data/Demo/miller-charm-rose-gold-2-600x720.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { WatchProduct } from '../types';

export default function WatchBestSeller({ seller }: { seller: WatchProduct[] | undefined }) {
  const dummyData = [
    { price: 30000, discount: 30 },
    { price: 20000, discount: 25 },
    { price: 10000, discount: 35 },
    { price: 15000, discount: 20 },
    { price: 18000, discount: 15 },
    { price: 25000, discount: 10 },
    { price: 17000, discount: 40 },
  ];

  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center md:mt-8">
      <h1 className="font-serif text-xl font-medium text-primaryBlue md:text-[35px]">
        Watch Best Seller
      </h1>
      <p>This component will display the best-selling items in the watch category.</p>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        className="mt-4 h-[300px] w-full md:h-[400px]"
      >
        {seller?.map((item, i) => (
          <SwiperSlide key={i} className="md:ml-6 flex justify-center md:px-3">
            <WatchCard
              href={`/product/${item.product.slug}`}
              img1={item.thumbnail}
              img2={item.additional}
              name="Miller Charm Rose Gold"
              price={item.product.offerPrice ?? item.product.price}
              discount={item.product.discount}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
