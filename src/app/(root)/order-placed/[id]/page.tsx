"use client";
import React from "react";
import { Result } from "antd";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const params = useParams();
  const orderId = params.id; // Assuming the order ID is passed as a URL parameter

  const router = useRouter();

  return (
    <div className="mt-52 h-96">
      <Result
        status="success"
        title="Successfully Placed!"
        subTitle={`Order number: ${orderId} Placed Successfully.`}
        extra={[
          <button
            key="buy again"
            onClick={() => {
              router.push("/");
            }}
            className="rounded-full bg-teal-400 px-6 py-2 text-white"
          >
            Buy Again
          </button>,
        ]}
      />
    </div>
  );
};

export default Page;
