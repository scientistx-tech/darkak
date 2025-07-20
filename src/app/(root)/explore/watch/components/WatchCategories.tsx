import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import img from '@/Data/Demo/thumb-1920-479220.jpg';

export default function WatchCategories() {
  return (
    <div className="mt-5 flex w-full flex-col gap-4 md:mt-10 md:flex-row md:justify-between md:gap-6">
      <WatchCategoriesContainer img={img} alt="Men Watch" name="FOR MEN" link="/" />
      <WatchCategoriesContainer img={img} alt="Women Watch" name="FOR WOMEN" link="/" />
      <WatchCategoriesContainer img={img} alt="Kids Watch" name="FOR KIDS" link="/" />
    </div>
  );
}

const WatchCategoriesContainer = ({
  img,
  alt,
  name,
  link,
}: {
  img: any;
  alt: string;
  name: string;
  link: string;
}) => {
  return (
    <div className="group relative h-[200px] w-full overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 md:h-[300px] md:w-[32%]">
      <Image
        src={img}
        alt={alt}
        fill
        className="rounded-xl object-cover transition-opacity duration-500"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4 text-center">
        <h3 className="text-2xl font-bold text-white drop-shadow">{name}</h3>
        <Link
          href={link}
          className="mt-2 inline-block rounded-full border border-white px-4 py-1.5 text-sm text-white transition-all duration-300 hover:bg-white hover:text-black"
        >
          Explore Now
        </Link>
      </div>
    </div>
  );
};
