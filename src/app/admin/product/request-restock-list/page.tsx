import RequireAccess from "@/components/Layouts/RequireAccess";

export default function RequestRestockList() {
  return (
    <RequireAccess permission="restock-product">
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto">
          <h1 className="mb-4 flex items-center gap-2 text-2xl font-bold">
            <span className="text-pink-600">🏠</span> Request Restock List{" "}
            <span className="rounded-full bg-gray-200 px-2 text-sm">0</span>
          </h1>

          {/* Filter Section */}
          <div className="mb-6 rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">Filter Products</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <input
                type="text"
                placeholder="DD MMM YYYY - DD MMM YYYY"
                className="w-full rounded-lg border px-3 py-2"
              />
              <select className="w-full rounded-lg border px-3 py-2">
                <option>Select category</option>
              </select>
              <select className="w-full rounded-lg border px-3 py-2">
                <option>Select Sub Category</option>
              </select>
              <select className="w-full rounded-lg border px-3 py-2">
                <option>Select brand</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button className="rounded-lg bg-gray-200 px-4 py-2 text-black">
                Reset
              </button>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                Show data
              </button>
            </div>
          </div>

          {/* Request List Section */}
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Request list{" "}
                <span className="rounded-full bg-gray-200 px-2 text-sm">0</span>
              </h2>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search by Product Name"
                  className="w-52 rounded-lg border px-3 py-2"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr className="bg-gray-100 text-sm">
                    <th className="px-4 py-2 font-medium">SL</th>
                    <th className="px-4 py-2 font-medium">Product Name</th>
                    <th className="px-4 py-2 font-medium">Selling Price</th>
                    <th className="px-4 py-2 font-medium">Last Request Date</th>
                    <th className="px-4 py-2 font-medium">Number Of Request</th>
                    <th className="px-4 py-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="py-10 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <div className="text-6xl">🗃️</div>
                        <p className="mt-2">No product found</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </RequireAccess>
  );
}
