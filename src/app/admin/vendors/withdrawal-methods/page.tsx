"use client";
import { WithdrawMethodTable } from "./components/WithdrawMethodTable";

const WithdrawMethodList: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold text-black dark:text-white">
        Withdraw Method List
      </h1>
      <WithdrawMethodTable />
    </div>
  );
};

export default WithdrawMethodList;
