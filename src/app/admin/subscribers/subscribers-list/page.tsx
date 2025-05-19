"use client";
import { SubscriberTable } from "./components/SubscriberTable";

const SubscriberList: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold text-black dark:text-white">
        Subscriber List
      </h1>
      <SubscriberTable />
    </div>
  );
};

export default SubscriberList;
