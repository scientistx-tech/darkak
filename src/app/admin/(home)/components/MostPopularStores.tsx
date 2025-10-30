import React from "react";
import { Building, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface Store {
  id: number;
  store_name: string;
  shop_logo: string;
  _count: {
    orders: number;
  };
}

interface MostPopularStoresProps {
  stores: Store[];
}

const MostPopularStores: React.FC<MostPopularStoresProps> = ({ stores }) => {
  // Limit to top 5 stores
  const topFiveStores = stores.slice(0, 5);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-dark">
      <div className="border-b p-4">
        <h3 className="text-md font-semibold dark:text-white">Most Popular Stores</h3>
      </div>
      <div className="divide-y">
        {topFiveStores.map((store) => (
          <div key={store.id} className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-gray-100 p-2">
                {store.shop_logo ? (
                  <Image
                    src={store.shop_logo}
                    alt={store.store_name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <Building className="h-10 w-10 text-gray-400" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium dark:text-white">{store.store_name}</h4>
              </div>
            </div>
            <div className="flex items-center">
              <ShoppingCart className="mr-1 h-4 w-4 text-gray-400 dark:text-blue-500 " />
              <span className="text-xs font-medium dark:text-white">{store._count.orders}</span>
            </div>
          </div>
        ))}

        {topFiveStores.length === 0 && (
          <div className="p-4 text-center text-gray-500 dark:text-white">
            No stores data available
          </div>
        )}
      </div>
    </div>
  );
};

export default MostPopularStores;
