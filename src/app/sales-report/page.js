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
    items: [
      { name: "Burger", quantity: 2, price: 50000 },
      { name: "Fries", quantity: 1, price: 20000 },
    ],
    paymentReceived: 150000, 
  },
  {
    orderNo: "#ORD002",
    date: "2025-04-17",
    type: "Offline",
    category: "Beverage",
    customer: "Jane Smith",
    items: [
      { name: "Coffee", quantity: 1, price: 30000 },
      { name: "Tea", quantity: 2, price: 15000 },
    ],
    paymentReceived: 120000,
  },

];

const itemsPerPage = 5;

export default function SalesReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const openDetailModal = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeDetailModal = () => {
    setSelectedTransaction(null);
  };

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

  // Menghitung sub total, tax, total diterima, dan kembalian
  const calculateTotals = (transaction) => {
    const subTotal = transaction.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const tax = subTotal * 0.1; // Misalnya pajak 10%
    const total = subTotal + tax;
    const change = transaction.paymentReceived - total;
    return { subTotal, tax, total, change };
  };

  return (
    <div className="space-y-6">
      {/* Header*/}
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-medium">Sales Report</h4>
        <p className="text-sm text-[var(--neutral-grey7)]">{today}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="start-date" className="text-sm text-[var(--neutral-grey7)]">
                Start
              </label>
              <input
                type="date"
                id="start-date"
                className="w-full border rounded-md p-2 text-sm border-[var(--neutral-grey2)] text-[var(--neutral-grey3)]"
              />
            </div>
            <div>
              <label htmlFor="finish-date" className="text-sm text-[var(--neutral-grey7)]">
                Finish
              </label>
              <input
                type="date"
                id="finish-date"
                className="w-full border rounded-md p-2 text-sm border-[var(--neutral-grey2)] text-[var(--neutral-grey3)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="category" className="text-sm text-[var(--neutral-grey7)]">
                Category
              </label>
              <select
                id="category"
                defaultValue=""
                className="w-full border rounded-md p-2 text-sm border-[var(--neutral-grey2)] text-[var(--neutral-grey3)]"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="food">Food</option>
                <option value="beverage">Beverage</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>

            <div>
              <label htmlFor="type" className="text-sm text-[var(--neutral-grey7)]">
                Order Type
              </label>
              <select
                id="type"
                defaultValue=""
                className="w-full border rounded-md p-2 text-sm border-[var(--neutral-grey2)] text-[var(--neutral-grey3)]"
              >
                <option value="" disabled>
                  Select Order Type
                </option>
                <option value="dinein">Dine In</option>
                <option value="takeaway">Take Away</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button className="w-full h-10 bg-[var(--blue1-main)] text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Search
              </button>
              <button className="w-10 h-10 border border-[var(--neutral-grey5)] rounded-md hover:bg-gray-300 transition flex justify-center items-center">
                <Image
                  src="/assets/icons/frame.svg"
                  alt="export"
                  width={18}
                  height={18}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Tabel Section */}
        <div className="overflow-x-auto bg-white rounded-t mt-6">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-[var(--neutral-grey1)] border-0 text-left text-black font-medium">
              <tr>
                <th className="px-4 py-3">No Order</th>
                <th className="px-4 py-3">Order Date</th>
                <th className="px-4 py-3">Order Type</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-black border-b border-[var(--neutral-grey1)]">
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{item.orderNo}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.customer}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => openDetailModal(item)}>
                      <Image
                        src="/assets/icons/export.svg"
                        alt="detail"
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

        {/* Pagination*/}
        <div className="flex justify-between items-center mt-4">
          {/* Show Entries Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[var(--neutral-grey7)]">Show:</span>
            <select
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              value={itemsPerPage}
              className="border border-[var(--neutral-grey2)] rounded-md p-2 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <span className="text-sm text-[var(--neutral-grey7)]">Entries</span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[var(--neutral-grey2)] text-[var(--neutral-grey4)] rounded-2xl"
            >
              &lt;
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 text-sm rounded-2xl ${
                    currentPage === index + 1
                      ? "bg-[var(--blue1-main)] text-white"
                      : "bg-[var(--neutral-grey2)] text-[var(--neutral-grey4)]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[var(--neutral-grey2)] text-[var(--neutral-grey4)] rounded-2xl"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Modal Detail Transaksi */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black/30 shadow-md flex items-center justify-center z-50">
            <div className="bg-white px-18 py-20 rounded-xl shadow-md w-full max-w-xl space-y-4 relative">
              <button
                onClick={closeDetailModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-3xl text-center font-medium mb-2 mt-2">
                Transaction Details
              </h2>
              <div className="bg-[var(--neutral-grey1)] p-4 rounded-md">
                <p className="text-[var(--neutral-grey7)] text-sm mb-1">
                  <span className="text-[var(--neutral-grey6)] font-light">No Order</span>{" "}
                  {selectedTransaction.orderNo}
                </p>
                <p className="text-[var(--neutral-grey7)] text-sm mb-1">
                  <span className="text-[var(--neutral-grey6)] font-light">Date</span>{" "}
                  {selectedTransaction.date}
                </p>
                <p className="text-[var(--neutral-grey7)] text-sm mb-1">
                  <span className="text-[var(--neutral-grey6)] font-light">Customer Name</span>{" "}
                  {selectedTransaction.customer}
                </p>
                <p className="text-sm mb-1">{selectedTransaction.type}</p>

                <hr className=" border-t border-[var(--neutral-grey2)] mb-4" />

                <ul>
                  {selectedTransaction.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-2xl font-medium">
                          {item.name}
                        </span>
                        <span className="text-xs text-[var(--neutral-grey7)]">
                          {item.quantity} x Rp {item.price}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        Rp {item.price * item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>

                <hr className=" border border-dashed border-[var(--neutral-grey3)] mb-4 mt-4" />

                {/* Sub Total, Tax, Total, Kembalian */}
                {calculateTotals(selectedTransaction) && (
                  <>
                    <p className="flex justify-between items-center text-sm mb-2">
                      <span className="text-[var(--neutral-grey5)]">Sub Total</span>
                      <span className="text-[var(--neutral-grey7)]">
                        Rp {calculateTotals(selectedTransaction).subTotal}
                      </span>
                    </p>
                    <p className="flex justify-between items-center text-sm">
                      <span className="text-[var(--neutral-grey5)]">Tax</span>
                      <span className="text-[var(--neutral-grey7)]">Rp {calculateTotals(selectedTransaction).tax}</span>
                    </p>

                    <hr className=" border border-dashed border-[var(--neutral-grey3)] mb-4 mt-4" />

                    <p className="flex justify-between items-center mb-4">
                      <span className="text-lg" >Total</span>
                      <span className="text-xl font-semibold">
                        Rp {calculateTotals(selectedTransaction).total}
                      </span>
                    </p>
                    <p className="flex justify-between items-center text-sm mb-2">
                      <span  className="text-[var(--neutral-grey5)]">Diterima</span>
                      <span className="text-black">Rp {selectedTransaction.paymentReceived}</span>
                    </p>
                    <p className="flex justify-between items-center text-sm">
                      <span  className="text-[var(--neutral-grey5)]">Kembalian</span>
                      <span  className="text-black">
                        Rp {calculateTotals(selectedTransaction).change}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
