import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import icon from '@/Data/Icon/dress.png';
import { WatchBrand as WTF } from '../types';

export default function WatchBrand({ brand }: { brand: WTF[] | undefined }) {
  return (
    <div className="mt-5 flex w-full flex-wrap justify-center gap-4 p-4 md:mt-10 md:gap-6">
      {brand?.map((d) => (
        <WatchBrandContainer
          key={d.id}
          img={d.brand.icon}
          alt={d.brand.title}
          link={`/brand/${d.brand.title.split(' ').join('-')}`}
        />
      ))}
    </div>
  );
}

const WatchBrandContainer = ({ img, alt, link }: { img: any; alt: string; link: string }) => {
  return (
    <Link
      href={link}
      className="group relative flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-xl border-2 border-primary shadow-lg transition-transform duration-300 hover:scale-105 hover:border-primaryBlue md:h-[130px] md:w-[130px]"
    >
      <Image
        src={img}
        alt={alt}
        width={500}
        height={500}
        className="h-[50px] w-[50px] rounded-xl transition-opacity duration-500 md:h-[65px] md:w-[65px]"
      />
    </Link>
  );
};
