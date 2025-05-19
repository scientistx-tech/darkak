import React, { useState } from "react";
import { FilterSection } from "./FilterSection";
import { DeleteFilled } from "@ant-design/icons";

interface Subscriber {
  id: number;
  email: string;
  subscribeDate: string;
}
const subscribers: Subscriber[] = [
  { id: 1, email: "fatema@gmail.com", subscribeDate: "21 Apr 2022, 04:12 AM" },
  { id: 2, email: "safae@gmail.com", subscribeDate: "20 Apr 2022, 05:09 AM" },
  { id: 3, email: "safa@gmail.com", subscribeDate: "20 Apr 2022, 05:05 AM" },
  { id: 4, email: "safayet@gmail.com", subscribeDate: "20 Apr 2022, 05:05 AM" },
  { id: 5, email: "abc@gmail.com", subscribeDate: "11 Apr 2022, 11:22 AM" },
];

export const SubscriberTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [limit, setLimit] = useState(100);
  const [filteredSubscribers, setFilteredSubscribers] = useState(subscribers);

  const handleFilter = () => {
    let filtered = [...subscribers];

    // Filter by email search term
    if (searchTerm) {
      filtered = filtered.filter((subscriber) =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by date if selected
    if (selectedDate) {
      filtered = filtered.filter(
        (subscriber) =>
          new Date(subscriber.subscribeDate).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString(),
      );
    }

    // Sort by subscribe date
    filtered.sort((a, b) => {
      const dateA = new Date(a.subscribeDate);
      const dateB = new Date(b.subscribeDate);
      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

    // Limit results
    filtered = filtered.slice(0, limit);

    setFilteredSubscribers(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedDate("");
    setSortOrder("asc");
    setLimit(100);
    setFilteredSubscribers(subscribers);
  };

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <FilterSection
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        limit={limit}
        setLimit={setLimit}
        onReset={handleReset}
        onFilter={handleFilter}
      />

      <div className="my-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-black dark:text-white">
          Subscriber List <span className="text-blue-500">5</span>
        </h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[12vw] rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <button className="rounded-[10px] bg-green-600 p-2 text-sm text-white hover:bg-green-700">
            Export
          </button>
        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <th className="p-2 text-black dark:text-white">SL</th>
            <th className="p-2 text-black dark:text-white">Email</th>
            <th className="p-2 text-black dark:text-white">Subscribe Date</th>
            <th className="p-2 text-black dark:text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubscribers.map((subscriber) => (
            <tr
              key={subscriber.id}
              className="border-b border-gray-300 dark:border-gray-600"
            >
              <td className="p-2 text-black dark:text-white">
                {subscriber.id}
              </td>
              <td className="p-2 text-black dark:text-white">
                {subscriber.email}
              </td>
              <td className="p-2 text-black dark:text-white">
                {subscriber.subscribeDate}
              </td>
              <td className="p-2 text-blue-600 dark:text-blue-400">
                <button className="hover:underline">
                  <DeleteFilled />{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
