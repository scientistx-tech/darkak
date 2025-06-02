import React from "react";

import { cookies } from "next/headers";
import RequireAccess from "@/components/Layouts/RequireAccess";
import ShopViewPage from "../components/ShopViewPage";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const token = (await cookies()).get("token")?.value;

  console.log("id", id);

  const shopDetails = await getShopDetailsById(id, token as string);

  console.log("shopDetails details", shopDetails);
  return (
    <RequireAccess permission="shop-details">
      <div className="w-full">
        <div className="h-[65px] w-full md:h-[109px]" />
        <ShopViewPage
          shop={shopDetails?.shop}
          products={shopDetails?.products}
        />
      </div>
    </RequireAccess>
  );
}

async function getShopDetailsById(id: string, token: string) {
  console.log("token", token);
  try {
    const res = await fetch(
      `https://api.darkak.com.bd/api/public/seller/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },

        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API error:", res.status, errorText);
      throw new Error("Failed to fetch shop details");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching shop details:", error);
    return null;
  }
}
