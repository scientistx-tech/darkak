import React from "react";
import RequireAccess from "@/components/Layouts/RequireAccess";

import { cookies } from "next/headers";
import CustomerTable from "./components/CustomerTable";

const CustomerDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const token = (await cookies()).get("token")?.value;

  const customerDetails = await getCustomerDetailsById(id, token as string);

  console.log("cus details", customerDetails);

  return (
    <RequireAccess permission="customer-details">
      <CustomerTable data={customerDetails} />
    </RequireAccess>
  );
};

export default CustomerDetailsPage;

async function getCustomerDetailsById(id: string, token: string) {
  console.log("token", token);
  try {
    const res = await fetch(
      `https://api.darkak.com.bd/api/admin/user/details/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

       next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch news data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching news details:", error);
    return null;
  }
}
