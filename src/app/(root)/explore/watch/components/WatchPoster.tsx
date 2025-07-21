import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import img2 from '@/Data/Demo/Rectangle 224.png';
import img1 from '@/Data/Demo/miller-charm-rose-gold-2-600x720.jpg';

export default function WatchPoster() {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center justify-between gap-4 p-[5%] md:h-[210px] md:flex-row">
        <div className="hidden w-1/3 md:block">
          <div className="absolute mt-[-30px] w-[250px] border-[10px] border-slate-100 md:h-[250px]">
            <Image
              src={img1}
              alt="Watch Poster"
              fill
              className="duration-50 object-cover transition-opacity"
            />
          </div>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center md:w-1/2 md:items-end md:justify-end">
          <p className="font-serif text-2xl font-medium text-primaryBlue md:text-[40px]">Lington</p>

          <p className="mt-5 text-slate-800 md:text-right">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s
          </p>
        </div>
      </div>

      <div className="flex md:hidden w-full items-center justify-center">
        <Image
          src={img1}
          alt="Watch Poster"
          className="absolute h-[200px] w-[200px] mt-[180px] border-[7px] border-slate-100"
        />
      </div>

      <div className="mt-[100px] md:mt-0 flex w-full flex-col items-center justify-between gap-4 bg-black p-[5%] md:h-[400px] md:flex-row">
        <div className="flex h-full w-full md:w-1/2 mt-[120px] md:mt-0 flex-col items-start justify-end">
          <p className="font-serif text-xl font-medium text-white md:text-[35px]">Lington</p>

          <p className="mt-5 text-slate-200">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-full border border-white px-4 py-2 text-sm text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            Explore Now
          </Link>
        </div>

        <div className=" w-full md:w-1/3">
          <Image src={img2} alt="Watch Poster" className="md:h-[400px] h-[300px] w-full" />
        </div>
      </div>
    </div>
  );
}
