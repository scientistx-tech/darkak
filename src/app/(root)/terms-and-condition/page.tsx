import React from 'react'
import TermsConditionPage from './TermsConditionPage'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Terms & Conditions"
};
export default function page() {
  return (
    <div>
        <div className="h-[65px] md:h-[109px] w-full"/>
        <TermsConditionPage />
    </div>
  )
}
