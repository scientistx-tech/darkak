interface Transaction {
  id: number;
  transactionId: string;
  customer: string;
  credit: number;
  debit: number;
  balance: number;
  transactionType: string;
  reference: string;
  createdAt: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    transactionId: "bfcc9291-6276-4a31-b287-b484f67d48f5",
    customer: "Devid Jack",
    credit: 237,
    debit: 0,
    balance: 989,
    transactionType: "Order place",
    reference: "100187",
    createdAt: "2024/01/10",
  },
  {
    id: 2,
    transactionId: "8964bc99-291a-4674-9ab2-c53cf153d89",
    customer: "Devid Jack",
    credit: 26,
    debit: 0,
    balance: 752,
    transactionType: "Order place",
    reference: "100188",
    createdAt: "2024/01/10",
  },
  {
    id: 3,
    transactionId: "59655b81-d5af-4437-85b1-b9e7540cb846",
    customer: "Devid Jack",
    credit: 24,
    debit: 0,
    balance: 726,
    transactionType: "Order place",
    reference: "100189",
    createdAt: "2024/01/10",
  },
  {
    id: 4,
    transactionId: "277421f8-d8bb-497e-b25a-c2365c3fba3a",
    customer: "Devid Jack",
    credit: 278,
    debit: 0,
    balance: 702,
    transactionType: "Order place",
    reference: "100190",
    createdAt: "2024/01/10",
  },
];

export const LoyaltyTable: React.FC = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold">
          Transactions <span className="text-blue-500">23</span>
        </h2>
        <div className="flex space-x-2">
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
