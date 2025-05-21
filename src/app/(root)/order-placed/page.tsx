"use client";
import React from "react";
import { Result } from "antd";
import { useRouter } from "next/navigation";

const Page = () => {
  // const searchParams = useSearchParams();
  // const orderId = searchParams.get("orderId");

  const router = useRouter();

  return (
    <div className="mt-52 h-96">
      <Result
        status="success"
        title="Successfully Ordered!"
        subTitle={`Order number: 34121huh1234 Placed Successfully.`}
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
