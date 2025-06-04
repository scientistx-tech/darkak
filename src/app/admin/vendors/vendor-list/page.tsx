"use client";

import RequireAccess from "@/components/Layouts/RequireAccess";
import { VendorTable } from "./components/VendorTable";

const VendorList: React.FC = () => {
  return (
    <RequireAccess permission="vendor-list">
      <div>
        <VendorTable />
      </div>
    </RequireAccess>
  );
};

export default VendorList;
