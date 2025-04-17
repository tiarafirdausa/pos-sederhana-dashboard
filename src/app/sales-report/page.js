"use client";
import { useState } from "react";
import Image from "next/image";

const today = new Date().toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const data = [
  {
    orderNo: "#ORD001",
    date: "2025-04-17",
    type: "Online",
    category: "Food",
    customer: "John Doe",
  },
  {
    orderNo: "#ORD002",
    date: "2025-04-17",
    type: "Offline",
    category: "Beverage",
    customer: "Jane Smith",
  },
  {
    orderNo: "#ORD003",
    date: "2025-04-16",
    type: "Online",
    category: "Dessert",
    customer: "Michael",
  },
  {
    orderNo: "#ORD004",
    date: "2025-04-15",
    type: "Offline",
    category: "Food",
    customer: "Sarah",
  },
  {
    orderNo: "#ORD001",
    date: "2025-04-17",
    type: "Online",
    category: "Food",
    customer: "John Doe",
  },
  {
    orderNo: "#ORD002",
    date: "2025-04-17",
    type: "Offline",
    category: "Beverage",
    customer: "Jane Smith",
  },
  {
    orderNo: "#ORD003",
    date: "2025-04-16",
    type: "Online",
    category: "Dessert",
    customer: "Michael",
  },
  {
    orderNo: "#ORD004",
    date: "2025-04-15",
    type: "Offline",
    category: "Food",
    customer: "Sarah",
  },
  {
    orderNo: "#ORD005",
    date: "2025-04-12",
    type: "Online",
    category: "Dessert",
    customer: "Alice",
  },
  {
    orderNo: "#ORD006",
    date: "2025-04-13",
    type: "Offline",
    category: "Food",
    customer: "Bob",
  },
];

const itemsPerPage = 5;

export default function SalesReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header: Title + Date */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Sales Report</h1>
        <p className="text-sm text-gray-500">{today}</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Start Date */}
          <div>
            <label htmlFor="start-date" className="text-sm text-gray-600">
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              className="w-full border rounded-md p-2 text-sm border-gray-300 text-gray-600"
            />
          </div>

          {/* Finish Date */}
          <div>
            <label htmlFor="finish-date" className="text-sm text-gray-600">
              Finish Date
            </label>
            <input
              type="date"
              id="finish-date"
              className="w-full border rounded-md p-2 text-sm border-gray-300 text-gray-600"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="text-sm text-gray-600">
              Category
            </label>
            <select
              id="category"
              defaultValue=""
              className="w-full border rounded-md p-2 text-sm border-gray-300 text-gray-600"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="food">Food</option>
              <option value="beverage">Beverage</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>

          {/* Order Type */}
          <div>
            <label htmlFor="type" className="text-sm text-gray-600">
              Order Type
            </label>
            <select
              id="type"
              defaultValue=""
              className="w-full border rounded-md p-2 text-sm border-gray-300 text-gray-600"
            >
              <option value="" disabled>
                Select Order Type
              </option>
              <option value="dinein">Dine In</option>
              <option value="takeaway">Take Away</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>

          {/* Button */}
          <div className="flex items-end gap-2">
            <button className="w-3/4 bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Search
            </button>
            <button className="w-1/4 border px-4 py-2 border-gray-300 rounded-md hover:bg-gray-300 transition items-center">
              <Image
                src="/assets/icons/frame.svg"
                alt="export"
                width={18}
                height={18}
              />
            </button>
          </div>
        </div>

        {/* Tabel Section */}
        <div className="overflow-x-auto bg-white rounded-t mt-6">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left text-gray-600">
              <tr>
                <th className="px-4 py-3">No Order</th>
                <th className="px-4 py-3">Order Date</th>
                <th className="px-4 py-3">Order Type</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{item.orderNo}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.customer}</td>
                  <td className="px-4 py-3">
                    <button>
                      <Image
                        src="/assets/icons/export.svg"
                        alt="export"
                        width={18}
                        height={18}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
