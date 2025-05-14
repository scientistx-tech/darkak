"use client";

import { FilterSection } from "./components/FilterSection";
import { CustomerTable } from "./components/CustomerTable";

const CustomerList: React.FC = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h1 className="mb-4 text-xl font-bold">
        Customer List <span className="text-blue-500">7</span>
      </h1>
      <FilterSection />
      <CustomerTable />
    </div>
  );
};

export default CustomerList;
