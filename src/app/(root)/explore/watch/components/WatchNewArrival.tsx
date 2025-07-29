'use client';
import React from 'react';
import WatchCard from './WatchCard';
import img1 from '@/Data/Demo/watch-product-removebg-preview.png';
import img2 from '@/Data/Demo/miller-charm-rose-gold-2-600x720.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { WatchProduct } from '../types';

export default function WatchNewArrival({ arrival }: { arrival: WatchProduct[] | undefined }) {
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center md:mt-8">
      <h1 className="font-serif text-xl font-medium text-primaryBlue md:text-[35px]">
        New Arrivals
      </h1>
      <p>Discover the latest styles in watches, just arrived.</p>
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
        {arrival?.map((item, i) => (
          <SwiperSlide key={i} className="md:ml-6 relative flex justify-center md:px-3">
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
