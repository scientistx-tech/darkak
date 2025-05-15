"use client";
import { BonusForm } from "./components/BonusForm";
import { BonusTable } from "./components/BonusTable";
const WalletBonusSetup: React.FC = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Wallet Bonus Setup</h1>
        <a href="#" className="text-sm text-blue-600">
          How it works
        </a>
      </div>
      <BonusForm />
      <div className="mt-6">
        <BonusTable />
      </div>
    </div>
  );
};

export default WalletBonusSetup;
