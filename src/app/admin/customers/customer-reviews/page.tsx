"use client";
import RequireAccess from "@/components/Layouts/RequireAccess";
import { ReviewFilterSection } from "./components/ReviewFilterSection";
import { ReviewTable } from "./components/ReviewTable";

const CustomerReviews: React.FC = () => {
  return (
    <RequireAccess permission="customer-review">
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h1 className="mb-4 text-xl font-bold">
          Customer Reviews <span className="text-blue-500">23</span>
        </h1>
        <ReviewFilterSection />
        <ReviewTable />
      </div>
    </RequireAccess>
  );
};

export default CustomerReviews;
