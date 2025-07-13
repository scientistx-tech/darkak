import React from 'react';
import BillingSection from './components/BillingSection';
import ProductSection from './components/ProductSection';

export default function page() {
  return (
    <div className="flex overflow-hidden gap-5">
      <div className="w-3/5">
        <p className='text-primary'>Product Section</p>
        <ProductSection />
      </div>

      <div className="w-2/5">
        <p className='text-primary'>Billing Section</p>
        <BillingSection />
      </div>
    </div>
  );
}
