"use client";

import dynamic from "next/dynamic";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FC } from "react";

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

// Dynamically import charts
const Doughnut = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  { ssr: false }
);

const Pie = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Pie),
  { ssr: false }
);

interface ApiData {
  courier_name: string;
  total_parcels: number;
  total_delivered_parcels: number;
  total_cancelled_parcels: number;
}

interface ChartProps {
  data: {
    mobile_number: string;
    total_parcels: number;
    total_delivered: number;
    total_cancel: number;
    apis: Record<string, ApiData>;
  };
}

const FruadChart: FC<ChartProps> = ({ data }) => {
  const apis = Object.values(data.apis);

  // Pie chart for overall deliveries
  const overallData = {
    labels: ["Delivered", "Cancelled"],
    datasets: [
      {
        data: [data.total_delivered, data.total_cancel],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  // Doughnut chart for courier-wise parcels
  const courierData = {
    labels: apis.map((api) => api.courier_name),
    datasets: [
      {
        data: apis.map((api) => api.total_parcels),
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1  gap-6">
      <div className="p-4 border rounded-lg shadow bg-white">
        <h2 className="text-lg font-semibold mb-4">Overall Performance</h2>
        <Pie data={overallData} />
      </div>

      <div className="p-4 border rounded-lg shadow bg-white">
        <h2 className="text-lg font-semibold mb-4">Parcels by Courier</h2>
        <Doughnut data={courierData} />
      </div>
    </div>
  );
};

export default FruadChart;
