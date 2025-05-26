import React from 'react'
import ContactPage from './ContactPage'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Contact Us"
};
export default function page() {
  return (
    <div className='w-full'>
      <div className="h-[65px] md:h-[109px] w-full"/>
      
        <ContactPage />
    </div>
  )
}
