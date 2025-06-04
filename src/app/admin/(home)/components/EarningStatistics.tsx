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
  const options: ChartOptions<"line"> = {
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
  } as ChartOptions<"line">;

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
        label: "Commission",
        data: data?.datasets[2]?.data || [],
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
          <span className="text-sm text-gray-600">Inhouse</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-red-400"></span>
          <span className="text-sm text-gray-600">Vendor</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-teal-400"></span>
          <span className="text-sm text-gray-600">Commission</span>
        </div>
      </div>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default EarningStatistics;
