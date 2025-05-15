export const WalletSummary: React.FC = () => {
  return (
    <div className="mb-4 flex space-x-4 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex-1">
        <h3 className="text-sm font-medium">Debit</h3>
        <p className="text-xl font-bold">$7,335.00</p>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium">Credit</h3>
        <p className="text-xl font-bold text-yellow-500">$64,739.00</p>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium">Balance</h3>
        <p className="text-xl font-bold text-green-500">$57,404.00</p>
      </div>
    </div>
  );
};
