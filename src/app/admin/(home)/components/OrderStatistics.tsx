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
import { useTheme } from "next-themes";

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
  const { theme } = useTheme(); // ✅ useTheme hook

  const isDarkMode = theme === "dark";

  if (isLoading)
    return (
      <div className="flex h-80 items-center justify-center dark:text-white">
        Loading chart data...
      </div>
    );
  if (error)
    return (
      <div className="flex h-80 items-center justify-center text-red-500 dark:text-white">
        Error loading chart data
      </div>
    );
  if (!data)
    return (
      <div className="flex h-80 items-center justify-center dark:text-white">
        No data available
      </div>
    );

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: isDarkMode ? "#ffffff" : "#4B5563",
          boxWidth: 12,
          padding: 20,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: isDarkMode ? "#1F2937" : "#ffffff", // dark: gray-800, light: white
        titleColor: isDarkMode ? "#ffffff" : "#111827", // dark: white, light: gray-900
        bodyColor: isDarkMode ? "#E5E7EB" : "#4B5563", // dark: gray-200, light: gray-600
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDarkMode ? "#D1D5DB" : "#4B5563", // gray-300 or gray-600
        },
      },
      y: {
        beginAtZero: true,
        grid: {

          color: isDarkMode ? "#374151" : "#E5E7EB", // gray-700 or gray-200
        },
        ticks: {
          color: isDarkMode ? "#D1D5DB" : "#4B5563",
        },
      },
    },
  };

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
      {
        label: "AliExpress",
        data: data?.datasets[2].data,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-90 py-6">
      <div className="mb-4 flex items-center space-x-4">
        <div className="flex items-center">
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-blue-400"></span>
          <span className="text-sm text-gray-600 dark:text-white">Inhouse</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-red-400"></span>
          <span className="text-sm text-gray-600 dark:text-white">Vendor</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-teal-400"></span>
          <span className="text-sm text-gray-600 dark:text-white">AliExpress</span>
        </div>
      </div>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default OrderStatistics;
