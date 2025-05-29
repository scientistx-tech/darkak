import { FaShippingFast, FaUndo, FaShieldAlt } from "react-icons/fa";
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
  return (
    <section
      style={{
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 0 2.6px",
      }}
      className="flex h-full w-full flex-col items-center justify-center rounded-md bg-[#F3F4F6] p-4 md:items-start md:justify-start"
    >
      <h2 className="mb-4 text-xl font-semibold text-primaryDarkBlue">
        Delivery Details
      </h2>

      <div className="flex w-full flex-col items-start justify-center gap-5 text-sm text-primaryDarkBlue">
        <div className="flex items-start gap-3">
          <FaShippingFast className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">Estimated Delivery in Dhaka</p>
            <p className="text-secondaryBlue">
              Arrives in {deliveryInfo?.delivery_time} business days
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaShippingFast className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">Delivery charge in dhaka</p>
            <p className="text-secondaryBlue">
              In dhaka {deliveryInfo?.delivery_charge}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaShippingFast className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">Estimated Delivery Outside Dhaka</p>
            <p className="text-secondaryBlue">
              Arrives in {deliveryInfo?.delivery_time_outside} business days
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaShippingFast className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">Delivery charge Outside dhaka</p>
            <p className="text-secondaryBlue">
              In dhaka {deliveryInfo?.delivery_charge_outside}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaUndo className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">Return Policy</p>
            <p className="text-secondaryBlue">
              Free returns within {deliveryInfo?.return_days} days
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaShieldAlt className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">Secure Delivery</p>
            <p className="text-secondaryBlue">Handled by trusted courier</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryDetails;
