'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import img1 from '@/Data/Demo/thumb-1920-831859.jpg';
import img2 from '@/Data/Demo/thumb-1920-479220.jpg';
import img3 from '@/Data/Demo/thumb-1920-394174.jpg';
import ShopNowButton from '@/components/Button/ShopNowButton';

const slides = [
  {
    image: img1,
    title: 'ULYSSE NARDIN',
    subtitle: 'Every second counts.',
    buttonLink: '/',
    buttonText: 'Shop Now',
  },
  {
    image: img2,
    title: 'ROLEX LEGACY',
    subtitle: 'Timeless craftsmanship.',
    buttonLink: '/',
    buttonText: 'Explore Collection',
  },
  {
    image: img3,
    title: 'OMEGA SPEEDMASTER',
    subtitle: 'Precision beyond limits.',
    buttonLink: '/',
    buttonText: 'View Watches',
  },
];

export default function WatchSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative md:h-[calc(100vh-109px)] w-full overflow-hidden bg-primary">
      {/* Background Image Transition */}
      {slides.map((slide, index) => (
        <Image
          key={index}
          src={slide.image}
          alt={`Slide ${index + 1}`}
          className={`absolute left-0 top-0 h-[350px] md:h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'z-0 opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Foreground Content */}
      <div className="relative z-10 ml-[5%] flex h-[350px] md:h-full w-[90%] items-end md:items-center justify-center text-white">
        <div className="w-full md:w-1/2">
          <p className="font-mono text-[30px] md:text-[60px]">{slides[currentIndex].title}</p>
          <p className="mt-[-10px] mb-5 font-serif text-[18px] md:text-[40px] font-thin text-white">
            {slides[currentIndex].subtitle}
          </p>
          <ShopNowButton
            link={slides[currentIndex].buttonLink}
            text={slides[currentIndex].buttonText}
            className="px-4"
          />
          <div className='w-full h-[20px]'/>
        </div>
        <div className="md:w-1/2"></div>
      </div>

      {/* Dots / Controls */}
      <div className="md:absolute bottom-0 left-0 z-20 flex h-[40px] md:h-[50px] w-full items-center justify-center gap-4 bg-primaryBlue md:bg-black/70 text-white">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-[10px] w-[30px] md:h-[12px] md:w-[40px] rounded-full border transition-all duration-300 ${
              index === currentIndex
                ? 'scale-110 border-white bg-white'
                : 'border-white bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
