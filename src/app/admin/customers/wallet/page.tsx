"use client";
import { WalletFilterSection } from "./components/WalletFilterSection";
import { WalletSummary } from "./components/WalletSummary";
import { WalletTable } from "./components/WalletTable";

const Wallet: React.FC = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h1 className="mb-4 text-xl font-bold">Wallet</h1>
      <h2 className="mb-4 text-lg font-semibold">Filter Options</h2>
      <WalletFilterSection />
      <h2 className="mb-4 mt-6 text-lg font-semibold">Summary</h2>
      <WalletSummary />
      <WalletTable />
    </div>
  );
};

export default Wallet;
