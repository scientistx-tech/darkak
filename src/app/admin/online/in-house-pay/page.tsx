import OnlineFilter from '../components/OnlineFilter';
import PaymentTable from '../components/PaymentTable';
import { getPaymentList } from '../services';

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  // Clean only string values
  const params=await searchParams;
  const safeParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") safeParams[key] = value;
  }

  const query = new URLSearchParams(safeParams);
  query.set("type", "inhouse");

  const data = await getPaymentList(query.toString());

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">In-House Payments</h2>
      <OnlineFilter />
      <PaymentTable data={data} />
    </div>
  );
}
