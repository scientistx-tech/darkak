"use client";
import WithdrawTable from "./components/WitdrawsTable";

const WithdrawRequest: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold text-black dark:text-white">
        Withdraw
      </h1>
      <WithdrawTable />
    </div>
  );
};

export default WithdrawRequest;
