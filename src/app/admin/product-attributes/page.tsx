"use client";

import { useState } from "react";

export default function AttributeSetup() {
  const [currentLanguage, setCurrentLanguage] = useState("English(EN)");
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="">
        <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold">
          <span className="text-yellow-600">📋</span> Attribute Setup
        </h1>

        {/* Language Tabs */}
        <div className="mb-6 flex gap-6">
          {["English(EN)", "Bangla(BD)"].map((lang, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentLanguage(lang)}
              className={`pb-2 font-medium ${
                currentLanguage === lang
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Form Input */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <label className="mb-2 block font-medium text-gray-700">
            Attribute Name<span className="ml-1 text-red-500">*</span>{" "}
            {`(${currentLanguage === "English(EN)" ? "EN" : "BD"})`}
          </label>
          <input
            type="text"
            placeholder="Enter Attribute Name"
            className="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-end gap-4">
            <button className="rounded-lg bg-gray-200 px-4 py-2 text-black">
              Reset
            </button>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
              Submit
            </button>
          </div>
        </div>

        {/* Attribute List */}
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">
              Attribute list{" "}
              <span className="rounded-full bg-gray-200 px-2 py-1 text-sm">
                2
              </span>
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Attribute Name"
                className="rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          <table className="w-full border-t border-gray-200 text-left">
            <thead>
              <tr className="text-gray-600">
                <th className="py-2">SL</th>
                <th className="py-2">Attribute Name</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, name: "Size" },
                { id: 2, name: "Type" },
              ].map((attr) => (
                <tr key={attr.id} className="border-t border-gray-200">
                  <td className="py-3">{attr.id}</td>
                  <td className="py-3">{attr.name}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:underline">
                        ✏️
                      </button>
                      <button className="text-red-600 hover:underline">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
