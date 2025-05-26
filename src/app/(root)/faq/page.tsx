import React from 'react'
import FaqPage from './FaqPage'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "FAQ"
};

export default function page() {
  return (
    <div>
         <div className="h-[65px] md:h-[109px] w-full"/>
         <FaqPage />
    </div>
  )
}
