import React from 'react'
import SignupPage from './SignupPage'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Sign Up"
};
export default function page() {
  return (
    <div className='w-full'>
      <SignupPage />
    </div>
  )
}
