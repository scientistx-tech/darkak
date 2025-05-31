import React, { useEffect, useState } from "react";
import { FilterSection } from "./FilterSection";
import { DeleteFilled } from "@ant-design/icons";
import Cookies from "js-cookie";

interface Subscriber {
  id: number;
  email: string;
  date: string;
}

export const SubscriberTable: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [limit, setLimit] = useState(100);

  // ✅ Fetch from API with search
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const queryParams = new URLSearchParams({
          limit: String(limit),
          sort: sortOrder,
        });

        if (searchTerm.trim()) {
          queryParams.append("search", searchTerm.trim());
        }

        const response = await fetch(
          `https://api.darkak.com.bd/api/admin/subscriber?${queryParams.toString()}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        const data = await response.json();
        if (data?.data) {
          setSubscribers(data.data);
          setFilteredSubscribers(data.data);
        }
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };

    fetchSubscribers();
  }, [limit, sortOrder, searchTerm]); // ⬅️ Includes searchTerm

  // ✅ Filter logic (date + sort only)
  const handleFilter = () => {
    let filtered = [...subscribers];

    if (selectedDate) {
      filtered = filtered.filter(
        (subscriber) =>
          new Date(subscriber.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

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
          Subscriber List{" "}
          <span className="text-blue-500">{filteredSubscribers.length}</span>
        </h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[12vw] rounded-[10px] border-[2px]  bg-white p-2 text-sm text-black focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <th className="p-2 text-black dark:text-white">SL</th>
            <th className="p-2 text-black dark:text-white">Email</th>
            <th className="p-2 text-black dark:text-white">Subscribe Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubscribers.map((subscriber, index) => (
            <tr key={subscriber.id} className="border-b border-gray-300 dark:border-gray-600">
              <td className="p-2 text-black dark:text-white">{index + 1}</td>
              <td className="p-2 text-black dark:text-white">{subscriber.email}</td>
              <td className="p-2 text-black dark:text-white">
                {new Date(subscriber.date).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
