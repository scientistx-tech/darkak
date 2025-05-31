"use client";

import VendorForm from "./components/VendorForm";

const AddNewVendor: React.FC = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h1 className="mb-4 text-xl font-bold">Add New Vendor</h1>
      <VendorForm />
    </div>
  );
};

export default AddNewVendor;
