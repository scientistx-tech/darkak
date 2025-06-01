"use client";

import RequireAccess from "@/components/Layouts/RequireAccess";
import { VendorTable } from "./components/VendorTable";

const VendorList: React.FC = () => {
  return (
    <RequireAccess permission="vendor-list">
      <div className="p-6">
        <VendorTable />
      </div>
    </RequireAccess>
  );
};

export default VendorList;
