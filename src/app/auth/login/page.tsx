import React from 'react'
import LoginPage from './LoginPage'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Login"
};
export default function page() {
  return (
    <div className='w-full'>
      <LoginPage />
    </div>
  )
}
