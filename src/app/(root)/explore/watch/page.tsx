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
import { HomeDataResponse } from './types';

export default async function page() {
  const data = await getWatchPage();
  return (
    <div>
      <div className="h-[65px] w-full xl:h-[109px]" />
      <WatchSlider sliders={data?.sliders || []} />

      <div className="container mx-auto flex flex-col gap-y-5 px-2 md:px-4">
        <CasualWatch banner={data?.banners.find((d) => d.type === 'casual') || undefined} />
        <PremiumWatch banner={data?.banners.find((d) => d.type === 'premium') || undefined} />
        <WatchCategories category={data?.category || undefined} />
        <WatchBrand brand={data?.brands || undefined} />
        <WatchBestSeller seller={data?.seller} />
        <WatchPoster poster={data?.poster} />
        <WatchNewArrival arrival={data?.arrivals} />
        <WatchTestimonial />
      </div>
    </div>
  );
}

async function getWatchPage() {
  try {
    const res = await fetch(`https://api.darkak.com.bd/api/public/watch-page`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: Bearer ${process.env.API_TOKEN}, // Uncomment if needed
      },
      // You must disable caching for dynamic SSR data
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch news data');
    }

    const data = (await res.json()) as HomeDataResponse;
    return data;
  } catch (error) {
    console.error('Error fetching news details:', error);
    return null;
  }
}
