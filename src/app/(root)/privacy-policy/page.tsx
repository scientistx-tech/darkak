import React from 'react'
import PrivacyPolicyPage from './PrivacyPolicyPage'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Privacy Policy"
};
export default function page() {
  return (
    <div>
        <div className="h-[65px] md:h-[109px] w-full"/>
        <PrivacyPolicyPage />
    </div>
  )
}
