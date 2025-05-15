interface Transaction {
  id: number;
  transactionId: string;
  customer: string;
  credit: string;
  debit: string;
  balance: string;
  transactionType: string;
  reference: string;
  createdAt: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    transactionId: "0514fb07-e72a-48e4-825c-2aa2b14e1b5a",
    customer: "Devid Jack",
    credit: "$500.00 + $150.00 Admin bonus",
    debit: "$0.00",
    balance: "$1,725.00",
    transactionType: "Add fund",
    reference: "Add funds to wallet",
    createdAt: "2023/10/12",
  },
  {
    id: 2,
    transactionId: "77c643a6-09de-4190-98b5-2875e3bebc4f",
    customer: "Devid Jack",
    credit: "$200.00",
    debit: "$0.00",
    balance: "$1,225.00",
    transactionType: "Add fund",
    reference: "Add funds to wallet",
    createdAt: "2023/10/12",
  },
  {
    id: 3,
    transactionId: "713ed46-e453-48fe-a7d2-d218a9401097",
    customer: "Tom Holland",
    credit: "$0.00",
    debit: "$380.00",
    balance: "$44,064.00",
    transactionType: "Order place",
    reference: "Order payment",
    createdAt: "2023/10/10",
  },
  {
    id: 4,
    transactionId: "22b3d36e-c4c6-4489-8747-923f21c84bd0",
    customer: "Tom Holland",
    credit: "$44,444.00",
    debit: "$0.00",
    balance: "$44,444.00",
    transactionType: "Add fund by admin",
    reference: "Fwr",
    createdAt: "2023/10/10",
  },
];

export const WalletTable: React.FC = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold">
          Transactions <span className="text-blue-500">14</span>
        </h2>
        <div className="flex space-x-2">
          <button className="rounded bg-blue-600 p-2 text-sm text-white">
            Add Fund
          </button>
          <button className="flex items-center rounded bg-green-600 p-2 text-sm text-white">
            <span className="mr-1">Export</span>
          </button>
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">SL</th>
            <th className="p-2">Transaction ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Credit</th>
            <th className="p-2">Debit</th>
            <th className="p-2">Balance</th>
            <th className="p-2">Transaction Type</th>
            <th className="p-2">Reference</th>
            <th className="p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b">
              <td className="p-2">{transaction.id}</td>
              <td className="p-2">{transaction.transactionId}</td>
              <td className="p-2">{transaction.customer}</td>
              <td className="p-2">{transaction.credit}</td>
              <td className="p-2">{transaction.debit}</td>
              <td className="p-2">{transaction.balance}</td>
              <td className="p-2">{transaction.transactionType}</td>
              <td className="p-2">{transaction.reference}</td>
              <td className="p-2">{transaction.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
