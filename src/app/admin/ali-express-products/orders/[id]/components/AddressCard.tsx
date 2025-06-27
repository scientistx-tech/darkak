export default function AddressCard({
  title,
  orderDetails,
}: {
  title: string;
  orderDetails: any;
}) {
  return (
    <div className="rounded border bg-white dark:bg-gray-dark dark:text-white p-4 text-slate-900 shadow">
      <div className="flex items-center gap-2">
        <img
          width={20}
          height={20}
          src="/images/icon/icon_location.png"
          alt=""
        />
        <h3 className="mb-2 font-semibold">{title}</h3>
      </div>
      <p>Name: {orderDetails?.name} hi gi</p>
      <p>District: {orderDetails?.district}</p>
      <p>Country: {orderDetails?.division}</p>
      <p className="text-sm text-gray-500">{orderDetails?.area}</p>
    </div>
  );
}
