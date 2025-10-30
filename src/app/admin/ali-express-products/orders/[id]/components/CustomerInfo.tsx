import Image from "next/image";

export default function CustomerInfo({ orderDetails }: any) {
  return (
    <div className="rounded border bg-white dark:bg-gray-dark p-4 text-slate-900 shadow">
      <div className="flex items-center gap-2">
        <Image width={20} height={20} src="/images/icon/icon_user.png" alt="" />
        <h3 className="mb-2 font-semibold">Customer Information</h3>
      </div>
      <p>Name: {orderDetails?.name}</p>
      <p>Phone: {orderDetails?.phone}</p>
      <p>Email: {orderDetails?.email}</p>
    </div>
  );
}
