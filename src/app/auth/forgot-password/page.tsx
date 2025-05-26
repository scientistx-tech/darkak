
import React from 'react';
import ForgotPasswordPage from './ForgotPasswordPage';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Forget Passowrd"
};
export default function page() {
  return (
    <div className='w-full'>
      <ForgotPasswordPage />
    </div>
  )
}
