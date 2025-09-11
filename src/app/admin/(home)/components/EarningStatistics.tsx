import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useEarningStatisticsQuery } from "@/redux/services/admin/adminDashboard";
import { useTheme } from "next-themes";
// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface EarningStatisticsProps {
  period: "year" | "month" | "week";
}

const EarningStatistics: React.FC<EarningStatisticsProps> = ({ period }) => {
  const { data, isLoading, error } = useEarningStatisticsQuery({ period });
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

  // Chart options
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDarkMode ? '#ffffff' : '#4B5563',
          boxWidth: 12,
          padding: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: isDarkMode ? '#1F2937' : '#ffffff', // dark: gray-800, light: white
        titleColor: isDarkMode ? '#ffffff' : '#111827', // dark: white, light: gray-900
        bodyColor: isDarkMode ? '#E5E7EB' : '#4B5563', // dark: gray-200, light: gray-600
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDarkMode ? '#D1D5DB' : '#4B5563', // gray-300 or gray-600
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDarkMode ? '#374151' : '#E5E7EB', // gray-700 or gray-200
        },
        ticks: {
          color: isDarkMode ? '#D1D5DB' : '#4B5563',
        },
      },
    },
  } as ChartOptions<'line'>;

  // Chart data
  const chartData = {
    labels: data?.labels,
    datasets: [
      {
        label: "Inhouse",
        data: data?.datasets[0].data,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Vendor",
        data: data?.datasets[1].data,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "AliExpress",
        data: data?.datasets[2].data,
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Commission",
        data: data?.datasets[3]?.data || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: true,
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
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-purple-400"></span>
          <span className="text-sm text-gray-600 dark:text-white">AliExpress</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-teal-400"></span>
          <span className="text-sm text-gray-600 dark:text-white">Commission</span>
        </div>
      </div>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default EarningStatistics;
