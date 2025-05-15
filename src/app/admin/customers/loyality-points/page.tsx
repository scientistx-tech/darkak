"use client";
import { LoyaltyFilterSection } from "./components/LoyaltyFilterSection";
import { LoyaltySummary } from "./components/LoyaltySummary";
import { LoyaltyTable } from "./components/LoyaltyTable";

const LoyaltyPointReport: React.FC = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h1 className="mb-4 text-xl font-bold">Customer Loyalty Point Report</h1>
      <h2 className="mb-4 text-lg font-semibold">Filter Options</h2>
      <LoyaltyFilterSection />
      <h2 className="mb-4 mt-6 text-lg font-semibold">Summary</h2>
      <LoyaltySummary />
      <LoyaltyTable />
    </div>
  );
};

export default LoyaltyPointReport;
