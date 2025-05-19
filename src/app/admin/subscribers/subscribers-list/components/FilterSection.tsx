export const FilterSection: React.FC<{
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  limit: number;
  setLimit: (limit: number) => void;
  onReset: () => void;
  onFilter: () => void;
}> = ({
  selectedDate,
  setSelectedDate,
  sortOrder,
  setSortOrder,
  limit,
  setLimit,
  onReset,
  onFilter,
}) => {
  return (
    <div>
      <div className="flex w-full gap-4">
        <div className="flex w-[30%] flex-col">
          <label className="text-sm font-medium text-black dark:text-white">
            Subscription Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex w-[30%] flex-col">
          <label className="text-sm font-medium text-black dark:text-white">
            Sort By
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="asc">Select mail sorting order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="flex w-[30%] flex-col">
          <label className="text-sm font-medium text-black dark:text-white">
            Choose First
          </label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value) || 100)}
            className="w-20 rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Ex: 100"
          />
        </div>
      </div>

      <div className="flex w-full justify-end gap-4">
        <button
          className="rounded-[10px] bg-gray-300 p-2 text-sm text-black hover:bg-gray-400 dark:text-white dark:hover:bg-gray-500"
          onClick={onReset}
        >
          Reset
        </button>
        <button
          className="rounded-[10px] bg-blue-600 p-2 text-sm text-white hover:bg-blue-700"
          onClick={onFilter}
        >
          Filter
        </button>
      </div>
    </div>
  );
};
