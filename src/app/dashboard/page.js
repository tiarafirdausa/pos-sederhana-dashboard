"use client";
import Image from "next/image";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const stats = [
    { title: "Total Orders", value: "500", icon: "/assets/icons/receipt.svg" },
    {
      title: "Total Omzet",
      value: "Rp 10.000.000",
      icon: "/assets/icons/wallet-money.svg",
    },
    {
      title: "All Menu Orders",
      value: "1000",
      icon: "/assets/icons/document.svg",
    },
    { title: "Foods", value: "500", icon: "/assets/icons/reserve.svg" },
    { title: "Beverages", value: "300", icon: "/assets/icons/coffee.svg" },
    { title: "Desserts", value: "200", icon: "/assets/icons/cake.svg" },
  ];

  // Chart Data
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Days of the week
    datasets: [
      {
        label: "Food",
        data: [200000, 150000, 220000, 180000, 210000, 240000, 250000], // Sample omzet data for Food
        backgroundColor: "#0E43AF",
        fill: true,
      },
      {
        label: "Beverage",
        data: [100000, 120000, 150000, 130000, 140000, 160000, 170000], // Sample omzet data for Beverage
        backgroundColor: "#3572EF",
        fill: true,
      },
      {
        label: "Dessert",
        data: [50000, 60000, 70000, 65000, 80000, 85000, 90000], // Sample omzet data for Dessert
        backgroundColor: "#C2D4FA",
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header: Title + Date */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">{today}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 text-left"
          >
            <p className="text-sm text-gray-500">{item.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <Image src={item.icon} alt={item.title} width={20} height={20} />
              <p className="text-lg font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          {/* Title (h3) - Left Aligned */}
          <h3 className="text-lg font-semibold">Total Omzet</h3>

          {/* Filters - Right Aligned */}
          <div className="flex gap-4">
            <div className="flex flex-col ">
              <label htmlFor="start-date" className="text-sm text-gray-300">
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                className="border rounded-md p-2 text-sm border-gray-300 text-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="finish-date" className="text-sm text-gray-300">
                Finish Date
              </label>
              <input
                type="date"
                id="finish-date"
                className="border rounded-md p-2 text-sm border-gray-300 text-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm text-gray-300">
                Category
              </label>
              <select id="category" className="border rounded-md p-2 text-sm border-gray-300 text-gray-300 ">
                <option value="" disabled selected>
                  Select Category
                </option>
                <option value="food">Food</option>
                <option value="beverage">Beverage</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <Bar data={data} />
      </div>
    </div>
  );
}
