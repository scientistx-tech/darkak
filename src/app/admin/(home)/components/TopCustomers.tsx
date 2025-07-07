import React from "react";
import { User } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  image?: string | null;
  _count: {
    orders: number;
  };
}

interface TopCustomersProps {
  customers: Customer[];
}

const TopCustomers: React.FC<TopCustomersProps> = ({ customers }) => {
  // Limit to top 5 customers
  const topFiveCustomers = customers.slice(0, 5);

  return (
    <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-dark shadow">
      <div className="border-b p-4">
        <h3 className="text-md font-semibold dark:text-white">Top Customer</h3>
      </div>
      <div className="divide-y">
        {topFiveCustomers.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-gray-100 p-2">
                {customer.image ? (
                  <img
                    src={customer.image}
                    alt={customer.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-10 w-10 text-gray-400" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium dark:text-white">{customer.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-100">{customer.email}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-white">
              Orders:{" "}
              <span className="font-medium dark:text-white">{customer._count.orders}</span>
            </div>
          </div>
        ))}

        {topFiveCustomers.length === 0 && (
          <div className="p-4 text-center text-gray-500 dark:text-white">
            No customers data available
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCustomers;
