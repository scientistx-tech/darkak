import { FaShippingFast, FaUndo, FaShieldAlt } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const DeliveryDetails = ({
  deliveryInfo,
}: {
  deliveryInfo: {
    delivery_time: string;
    delivery_charge: number;
    return_days: string;
    delivery_time_outside: string;
    delivery_charge_outside: number;
  };
}) => {
  const lang = useSelector((state: RootState) => state.language.language);
  return (
    <section
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 0 2.6px',
      }}
      className="flex h-full w-full flex-col items-center justify-center rounded-md bg-[#F3F4F6] p-4 md:items-start md:justify-start"
    >
      <h2 className="mb-4 text-xl font-semibold text-primaryDarkBlue">
        {lang === 'bn' ? 'ডেলিভারি বিবরণ' : 'Delivery Details'}
      </h2>

      <div className="flex w-full flex-col items-start justify-center gap-5 text-sm text-primaryDarkBlue">
        <div className="flex items-start gap-3">
          <FaShippingFast className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">
              {lang === 'bn' ? 'ঢাকায় আনুমানিক ডেলিভারি' : 'Estimated Delivery in Dhaka'}
            </p>
            <p className="text-secondaryBlue">
              {lang === 'bn' ? 'পৌঁছাবে' : 'Arrives in'} {deliveryInfo?.delivery_time}{' '}
              {lang === 'bn' ? 'কর্মদিবসের মধ্যে' : 'business days'}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaShippingFast className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">
              {lang === 'bn' ? 'ঢাকায় ডেলিভারি চার্জ' : 'Delivery charge in Dhaka'}
            </p>
            <p className="text-secondaryBlue">
              {lang === 'bn' ? 'ঢাকার মধ্যে' : 'In Dhaka'} {deliveryInfo?.delivery_charge}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaShippingFast className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">
              {lang === 'bn' ? 'ঢাকার বাইরে আনুমানিক ডেলিভারি' : 'Estimated Delivery Outside Dhaka'}
            </p>
            <p className="text-secondaryBlue">
              {lang === 'bn' ? 'পৌঁছাবে' : 'Arrives in'} {deliveryInfo?.delivery_time_outside}{' '}
              {lang === 'bn' ? 'কর্মদিবসের মধ্যে' : 'business days'}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaShippingFast className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">
              {lang === 'bn' ? 'ঢাকার বাইরে ডেলিভারি চার্জ' : 'Delivery charge Outside Dhaka'}
            </p>
            <p className="text-secondaryBlue">
              {lang === 'bn' ? 'ঢাকার মধ্যে' : 'In Dhaka'} {deliveryInfo?.delivery_charge_outside}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaUndo className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">{lang === 'bn' ? 'রিটার্ন নীতি' : 'Return Policy'}</p>
            <p className="text-secondaryBlue">
              {lang === 'bn' ? 'ফ্রি রিটার্নের সময়সীমা:' : 'Free returns within'}
              {deliveryInfo?.return_days} {lang === 'bn' ? 'দিনের মধ্যে' : 'days'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaShieldAlt className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">{lang === 'bn' ? 'নিরাপদ ডেলিভারি' : 'Secure Delivery'}</p>
            <p className="text-secondaryBlue">
              {lang === 'bn' ? 'বিশ্বস্ত কুরিয়ার দ্বারা পরিচালিত' : 'Handled by trusted courier'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryDetails;
