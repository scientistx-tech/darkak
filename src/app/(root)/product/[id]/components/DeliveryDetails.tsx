import {
  FaShippingFast,
  FaUndo,
  FaShieldAlt,
} from "react-icons/fa";
const DeliveryDetails = () => {
  return (
    <section className="mt-8 rounded-2xl bg-secondaryWhite p-4 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-primaryDarkBlue">
        Delivery Details
      </h2>

      <div className="grid gap-2 text-sm text-primaryDarkBlue md:grid-cols-2">
        <div className="flex items-start gap-3">
          <FaShippingFast className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">Estimated Delivery</p>
            <p className="text-secondaryBlue">Arrives in 3-5 business days</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaShippingFast className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">Delivery charge in dhaka</p>
            <p className="text-secondaryBlue">In dhaka ৳60!</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaUndo className="mt-1 text-lg text-primaryBlue" />
          <div>
            <p className="font-medium">Return Policy</p>
            <p className="text-secondaryBlue">Free returns within 7 days</p>
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
