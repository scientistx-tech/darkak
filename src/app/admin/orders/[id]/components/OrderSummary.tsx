import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

export default function OrderSummary({ orderDetails }: any) {
  // Calculate item price (sum of all item prices * quantity)
  const itemPrice = orderDetails?.order_items?.reduce(
    (sum: number, item: any) => sum + item.product.price * item.quantity,
    0,
  );

  // Calculate item discount (sum of all discounts)
  const itemDiscount = orderDetails?.order_items?.reduce(
    (sum: number, item: any) => {
      if (item.product.discount_type === "flat") {
        return sum + item.product.discount * item.quantity;
      } else if (item.product.discount_type === "percentage") {
        return (
          sum +
          ((item.product.price * item.product.discount) / 100) * item.quantity
        );
      }
      return sum;
    },
    0,
  );

  // Subtotal = itemPrice - itemDiscount
  const subTotal = itemPrice - itemDiscount;

  // Coupon discount (assuming orderDetails.discount is coupon discount)
  const couponDiscount = orderDetails?.discount || 0;

  // VAT/Tax (assuming orderDetails.tax)
  const vatTax = orderDetails?.tax || 0;

  // Shipping fee (orderDetails.deliveryFee)
  const shippingFee = orderDetails?.deliveryFee || 0;

  // Total (from orderDetails.total, or calculate)
  const total = subTotal - couponDiscount + vatTax + shippingFee;
  return (
    <div className="rounded border bg-white p-4 text-black shadow">
      {/* order header */}
      <div className="mb-10 flex justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-900">
            Order ID: # {orderDetails?.orderId}
          </p>
          <h2 className="text-sm text-gray-5">10 Jan, 2024 , 06:28 PM</h2>
        </div>
        <div className="flex flex-col items-end gap-3 font-sans text-sm">
          <span>
            Status:{" "}
            <p className="ml-1 inline rounded-full bg-blue-100 px-5 py-1 font-bold text-blue-700">
              {orderDetails?.status}
            </p>
          </span>
          <span>
            Payment Method:{" "}
            <p className="ml-1 inline font-bold text-gray-5">
              {orderDetails?.paymentType === "cod"
                ? "Cash On Delivery"
                : "Online Payment"}
            </p>
          </span>
          <div className="flex items-center">
            Payment Status:{" "}
            <div className="ml-1 inline rounded-full font-bold text-green-600">
              {orderDetails?.paid ? (
                <p className="font-bold text-green-600">Paid</p>
              ) : (
                <p className="text-red-600">Unpaid</p>
              )}
            </div>
          </div>
          {/* <span>
            Order Verification Id:
            <p className="ml-1 inline rounded-full font-bold text-gray-5">
              123123123
            </p>
          </span> */}
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th>SL</th>
            <th>Item Details</th>
            <th className="text-right">Item Price</th>
            <th className="text-right">Discount</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails?.order_items?.map((item: any, i: number) => (
            <tr key={i} className="mb-1 border-b py-2">
              <td>{i + 1}</td>
              <td className="flex items-center gap-2">
                <Image
                  width={50}
                  height={50}
                  src={item?.product?.thumbnail}
                  alt=""
                />
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-slate-800">
                    {`${item?.product?.title} (${item?.product?.code})`}
                    <div className="ml-3 inline-block text-gray-6">
                      <RxCross2 className="inline" />
                      {item?.quantity}{" "}
                    </div>
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-5">
                    <div>
                      {item?.options?.map((option: any, i: number) => (
                        <div key={i} className="text-slate-900">
                          <p className="inline">{option?.item?.title}:</p>{" "}
                          {option?.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-right">
                ৳{item?.product?.price * item?.quantity}
              </td>
              <td className="text-right">৳{item?.product?.discount}</td>
              <td className="text-right">
                ৳
                {item?.product?.discount_type === "flat"
                  ? item?.product?.price - item?.product?.discount
                  : item?.product?.price -
                    (item?.product?.discount * item?.product?.price) / 100}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex flex-row justify-end space-y-1">
        <div className="flex w-[50%] items-center justify-between">
          <div className="flex flex-col gap-2 text-right font-bold text-gray-5">
            <p>Item Price</p>
            <p>Item Discount</p>
            <p>Sub Total</p>
            <p>Cupon Discount</p>
            <p>Vat/Tax</p>
            <p>Shipping Fee</p>
            <p>Total</p>
          </div>
          <div className="flex flex-col gap-2 text-right font-bold text-slate-800">
            <p>৳{itemPrice}</p>
            <p>-৳{itemDiscount}</p>
            <p>৳{subTotal}</p>
            <p>-৳{couponDiscount}</p>
            <p>৳{vatTax}</p>
            <p>৳{shippingFee}</p>
            <p>৳{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
