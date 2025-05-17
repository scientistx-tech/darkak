import { DeleteFilled, EditFilled } from "@ant-design/icons";
import React, { useState } from "react";

interface Bonus {
  id: number;
  bonusTitle: string;
  bonusInfo: string;
  bonusAmount: string;
  startedOn: string;
  expiresOn: string;
  status: boolean;
}

const bonuses: Bonus[] = [
  {
    id: 1,
    bonusTitle: "Add fund Bonus",
    bonusInfo: "Minimum add amount: $31,000.00\nMaximum bonus: $5,000.00",
    bonusAmount: "35%",
    startedOn: "12 Oct, 2023",
    expiresOn: "26 Nov, 2031",
    status: false,
  },
  {
    id: 2,
    bonusTitle: "Flat Bonus",
    bonusInfo: "Minimum add amount: $500.00",
    bonusAmount: "$150.00",
    startedOn: "12 Oct, 2023",
    expiresOn: "22 Nov, 2030",
    status: true,
  },
];

export const BonusTable: React.FC = () => {
  const [bonusList, setBonusList] = useState<Bonus[]>(bonuses);

  const toggleStatus = (id: number) => {
    setBonusList(
      bonusList.map((bonus) =>
        bonus.id === id ? { ...bonus, status: !bonus.status } : bonus,
      ),
    );
  };

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold">
          Wallet Bonus Table <span className="text-blue-500">2</span>
        </h2>
        <div>
          <input
            type="text"
            placeholder="Search by bonus title"
            className="rounded border p-2 text-sm"
          />
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">SL</th>
            <th className="p-2">Bonus Title</th>
            <th className="p-2">Bonus Info</th>
            <th className="p-2">Bonus Amount</th>
            <th className="p-2">Started On</th>
            <th className="p-2">Expires On</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {bonusList.map((bonus) => (
            <tr key={bonus.id} className="border-b">
              <td className="p-2">{bonus.id}</td>
              <td className="p-2">{bonus.bonusTitle}</td>
              <td className="whitespace-pre-line p-2">{bonus.bonusInfo}</td>
              <td className="p-2">{bonus.bonusAmount}</td>
              <td className="p-2">{bonus.startedOn}</td>
              <td className="p-2">{bonus.expiresOn}</td>
              <td className="p-2">
                <button
                  onClick={() => toggleStatus(bonus.id)}
                  className={`h-6 w-12 rounded-full p-1 ${bonus.status ? "bg-blue-600" : "bg-gray-300"}`}
                >
                  <div
                    className={`h-4 w-4 transform rounded-full bg-white shadow-md ${
                      bonus.status ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </td>
              <td className="flex space-x-2 p-2">
                <button className="text-blue-500">
                  <EditFilled />
                </button>
                <button className="text-red-500">
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
