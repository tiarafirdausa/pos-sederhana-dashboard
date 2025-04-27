"use client";
import { useState } from "react";
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

//  ChartJS components
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
  const [showModal, setShowModal] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null); 

  const openStatDetail = (stat) => {
    setSelectedStat(stat);
  };

  const closeStatDetail = () => {
    setSelectedStat(null);
  };

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
    {
      title: "Foods",
      value: "500",
      icon: "/assets/icons/reserve.svg",
      details: [
        { name: "Gado-gado Spesial", total: 10 },
        { name: "Ketoprak", total: 5 },
        { name: "Siomay", total: 3 },
        { name: "Batagor", total: 2 },
        { name: "Bakso", total: 2 },
        { name: "Mie Ayam", total: 2 },
        { name: "Soto Ayam", total: 1 },
        { name: "Soto Sapi", total: 0 },
      ],
    },
    {
      title: "Beverages",
      value: "300",
      icon: "/assets/icons/coffee.svg",
      details: [
        { name: "Es Teh Manis", total: 20 },
        { name: "Es Jeruk", total: 15 },
        { name: "Jus Alpukat", total: 10 },
        { name: "Jus Mangga", total: 8 },
        { name: "Kopi Hitam", total: 5 },
        { name: "Kopi Susu", total: 3 },
        { name: "Susu Coklat", total: 2 },
        { name: "Air Mineral", total: 1 },
      ],
    },
    {
      title: "Desserts",
      value: "200",
      icon: "/assets/icons/cake.svg",
      details: [
        { name: "Puding Coklat", total: 12 },
        { name: "Es Krim Vanilla", total: 10 },
        { name: "Kue Lapis", total: 6 },
        { name: "Brownies", total: 5 },
        { name: "Cheesecake", total: 4 },
        { name: "Donat", total: 3 },
        { name: "Klepon", total: 2 },
        { name: "Dadar Gulung", total: 1 },
      ],
    },
  ];

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Food",
        data: [200000, 150000, 220000, 180000, 210000, 240000, 250000],
        backgroundColor: "#0E43AF",
        fill: true,
      },
      {
        label: "Beverage",
        data: [100000, 120000, 150000, 130000, 140000, 160000, 170000],
        backgroundColor: "#3572EF",
        fill: true,
      },
      {
        label: "Dessert",
        data: [50000, 60000, 70000, 65000, 80000, 85000, 90000],
        backgroundColor: "#C2D4FA",
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-medium">Dashboard</h4>
        <p className="text-sm text-[var(--neutral-grey7)]">{today}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="relative bg-white rounded-xl shadow-md p-4 text-left"
          >
            {["Foods", "Beverages", "Desserts"].includes(item.title) && (
              <button
                onClick={() => openStatDetail(item)}
                className="absolute bottom-4 right-4"
              >
                <Image
                  src="/assets/icons/export.svg"
                  alt="detail"
                  width={18}
                  height={18}
                />
              </button>
            )}

            <p className="text-sm text-black">{item.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <Image src={item.icon} alt={item.title} width={20} height={20} />
              <p className="text-lg font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-medium">Total Omzet</h4>
          <div className="flex gap-4">
            <div className="flex flex-col ">
              <label htmlFor="start-date" className="text-sm font-light text-[var(--neutral-grey3)]">
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                className="border rounded-md p-2 text-sm font-light border-[var(--neutral-grey2)] text-[var(--neutral-grey3)]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="finish-date" className="text-sm font-light text-[var(--neutral-grey3)]">
                Finish Date
              </label>
              <input
                type="date"
                id="finish-date"
                className="border rounded-md p-2 text-sm font-light border-[var(--neutral-grey2)] text-[var(--neutral-grey3)]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm font-light text-[var(--neutral-grey3)]">
                Category
              </label>
              <select
                id="category"
                defaultValue=""
                className="border rounded-md p-2 text-sm font-light border-[var(--neutral-grey2)] text-[var(--neutral-grey3)]"
              >
                <option value="" disabled>
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

        {/* Modal Detail Stat */}
        {selectedStat && (
          <div className="fixed inset-0 bg-black/30 shadow-md flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-md w-[90%] max-w-md space-y-4 relative">
              {/* Close Button */}
              <button
                onClick={closeStatDetail}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                aria-label="Close"
              >
                &times;
              </button>

              <h4 className="text-2xl font-medium">{selectedStat.title}</h4>

              {/* Search Input */}
              <div className="relative w-full mb-4">
                <Image
                  src="/assets/icons/search-normal.svg"
                  alt="Search Icon"
                  width={16}
                  height={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Enter the keyword here..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--neutral-grey2)] focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm font-light text-[var(--neutral-grey3)]"
                />
              </div>

              {/* Table */}
              {selectedStat.details ? (
                <div className="space-y-2">
                  <table className="w-full text-sm mt-2">
                    <thead className="bg-gray-100">
                      <tr className="text-left font-medium">
                        <th className="p-3">Menu Name</th>
                        <th className="p-3">Total Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedStat.details.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="p-3">{item.name}</td>
                          <td className="p-3">{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Tidak ada data yang tersedia.
                </p>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
