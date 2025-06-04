import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useOrderStatisticsQuery } from "@/redux/services/admin/adminDashboard";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface OrderStatisticsProps {
  period: "year" | "month" | "week";
}

const OrderStatistics: React.FC<OrderStatisticsProps> = ({ period }) => {
  const { data, isLoading, error } = useOrderStatisticsQuery({ period });

  if (isLoading)
    return (
      <div className="flex h-80 items-center justify-center">
        Loading chart data...
      </div>
    );
  if (error)
    return (
      <div className="flex h-80 items-center justify-center text-red-500">
        Error loading chart data
      </div>
    );
  if (!data)
    return (
      <div className="flex h-80 items-center justify-center">
        No data available
      </div>
    );

  // Chart options
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 20,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [2, 4],
        },
      },
    },
  } as ChartOptions<"bar">;

  // Chart data
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Inhouse",
        data: data?.datasets[0].data,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Vendor",
        data: data?.datasets[1].data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-90 py-6">
      <div className="mb-4 flex items-center space-x-4">
        <div className="flex items-center">
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-blue-400"></span>
          <span className="text-sm text-gray-600">Inhouse</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-red-400"></span>
          <span className="text-sm text-gray-600">Vendor</span>
        </div>
      </div>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default OrderStatistics;
