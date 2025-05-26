import React from 'react'
import EasyCheckout from './EasyCheckout'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Checkout"
};
export default function page() {
  return (
    <div>
        <div className="h-[65px] md:h-[109px] w-full"/>
        <EasyCheckout />
    </div>
  )
}
