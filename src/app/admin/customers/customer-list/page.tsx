"use client";

import { CustomerTable } from "./components/CustomerTable";
import { useState } from "react";
import { useGetCustomersListQuery } from "@/redux/services/admin/adminCustomerList";
import RequireAccess from "@/components/Layouts/RequireAccess";
import FilterSection from "./components/FilterSection";

const CustomerList: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState<string>("");
  const [queryParams, setQueryParams] = useState({});
  console.log(queryParams, "qqq");
  const { data, isLoading, refetch } = useGetCustomersListQuery({
    page,
    limit,
    search,
    ...queryParams, // Spread additional filter params here
  });

  return (
    <RequireAccess permission="customer-list">
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h1 className="mb-4 text-xl font-bold">
          Customer List{" "}
          <span className="text-blue-500">{data?.totalItems ?? 0}</span>
        </h1>

        <FilterSection setQueryParams={setQueryParams} />

        {isLoading ? (
          <p className="mt-4 text-gray-500">Loading customers...</p>
        ) : (
          <CustomerTable
            refetch={refetch}
            data={data?.data || []}
            setSearch={setSearch}
          />
        )}
      </div>
    </RequireAccess>
  );
};

export default CustomerList;
