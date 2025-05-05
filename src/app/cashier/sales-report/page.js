"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const today = new Date().toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const itemsPerPage = 5;

// Fungsi untuk memformat mata uang Rupiah
const formatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

export default function SalesReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]); // State untuk menyimpan data transaksi dari API
  const [loading, setLoading] = useState(true); // State untuk indikator loading
  const [error, setError] = useState(null); // State untuk menyimpan error jika terjadi
  const [filteredData, setFilteredData] = useState([]); // Data yang ditampilkan setelah filter/pagination
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedStat, setSelectedStat] = useState(null);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage); // St

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/orders");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData.orders);
        setFilteredData(responseData.orders); // Initialize filtered data
      } catch (e) {
        setError(e);
        console.error("Failed to fetch data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openStatDetail = async (category) => {
    setSelectedStat({ title: category, details: [] }); // Inisialisasi details
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/orders/${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setSelectedStat({ title: category, details: responseData.details }); // Set dengan data yang benar
    } catch (e) {
      setError(e);
      console.error(`Gagal mengambil detail statistik untuk ${category}:`, e);
      setSelectedStat({ title: category, details: [] });
    } finally {
      setLoading(false);
    }
  };

  const closeStatDetail = () => {
    setSelectedStat(null);
  };

  const openTransactionDetail = (transaction) => {
    // Format data transaksi untuk modal
    const formattedTransaction = {
      orderNo: transaction.no_order,
      date: new Date(transaction.date).toLocaleDateString("id-ID"),
      customer: transaction.customer_name,
      type: transaction.order_type,
      items: data
        .filter((item) => item.order_id === transaction.order_id)
        .map((item) => ({
          name: item.menu_name,
          quantity: item.quantity,
          price: item.price,
        })),
      subTotal: transaction.sub_total,
      tax: transaction.tax,
      total: transaction.total,
      amountReceived: transaction.amount_received,
      amountChange: transaction.amount_change,
    };
    setSelectedTransaction(formattedTransaction);
  };

  const closeTransactionDetail = () => {
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

  const setItemsPerPage = (value) => {
    setItemsPerPageState(value);
    setCurrentPage(1);
  };

  // Calculate stats
  const totalOrders = data.length;
  const totalOmzet = data.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0);
  console.log("Total Omzet:", totalOmzet); // Debugging log

  const allMenuOrders = data.reduce((sum, order) => {
    if (order.quantity) {
      return sum + order.quantity;
    }
    return sum;
  }, 0);

  const foodOrders = data.filter((order) => order.menu_category === "food");
  const totalFoodOrders = foodOrders.reduce((sum, order) => {
    if (order.quantity) {
      return sum + order.quantity;
    }
    return sum;
  }, 0);

  const beverageOrders = data.filter((order) => order.menu_category === "beverage");
  const totalBeverageOrders = beverageOrders.reduce((sum, order) => {
    if (order.quantity) {
      return sum + order.quantity;
    }
    return sum;
  }, 0);

  const dessertOrders = data.filter((order) => order.menu_category === "dessert");
  const totalDessertOrders = dessertOrders.reduce((sum, order) => {
    if (order.quantity) {
      return sum + order.quantity;
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header*/}
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-medium">Sales Report</h4>
        <p className="text-sm text-[var(--neutral-grey7)]">{today}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Orders */}
        <div className="relative bg-white rounded-xl shadow-md p-4 text-left">
          <p className="text-sm text-black">Total Orders</p>
          <div className="flex items-center gap-2 mt-1">
            <Image
              src="/assets/icons/receipt.svg"
              alt="Total Orders"
              width={20}
              height={20}
            />
            <p className="text-lg font-medium">{totalOrders}</p>
          </div>
        </div>

        {/* Total Omzet */}
        <div className="relative bg-white rounded-xl shadow-md p-4 text-left">
          <p className="text-sm text-black">Total Omzet</p>
          <div className="flex items-center gap-2 mt-1">
            <Image
              src="/assets/icons/wallet-money.svg"
              alt="Total Omzet"
              width={20}
              height={20}
            />
            <p className="text-lg font-medium">{formatRupiah(totalOmzet)}</p>
          </div>
        </div>

        {/* All Menu Orders */}
        <div className="relative bg-white rounded-xl shadow-md p-4 text-left">
          <p className="text-sm text-black">All Menu Orders</p>
          <div className="flex items-center gap-2 mt-1">
            <Image
              src="/assets/icons/document.svg"
              alt="All Menu Orders"
              width={20}
              height={20}
            />
            <p className="text-lg font-medium">{allMenuOrders}</p>
          </div>
        </div>

        {/* Foods */}
        <div className="relative bg-white rounded-xl shadow-md p-4 text-left">
          <button
            onClick={() => openStatDetail("food")}
            className="absolute bottom-4 right-4"
          >
            <Image
              src="/assets/icons/export.svg"
              alt="detail"
              width={18}
              height={18}
            />
          </button>
          <p className="text-sm text-black">Foods</p>
          <div className="flex items-center gap-2 mt-1">
            <Image
              src="/assets/icons/reserve.svg"
              alt="Foods"
              width={20}
              height={20}
            />
            <p className="text-lg font-medium">{totalFoodOrders}</p>
          </div>
        </div>

        {/* Beverages */}
        <div className="relative bg-white rounded-xl shadow-md p-4 text-left">
          <button
            onClick={() => openStatDetail("beverage")}
            className="absolute bottom-4 right-4"
          >
            <Image
              src="/assets/icons/export.svg"
              alt="detail"
              width={18}
              height={18}
            />
          </button>
          <p className="text-sm text-black">Beverages</p>
          <div className="flex items-center gap-2 mt-1">
            <Image
              src="/assets/icons/coffee.svg"
              alt="Beverages"
              width={20}
              height={20}
            />
            <p className="text-lg font-medium">{totalBeverageOrders}</p>
          </div>
        </div>

        {/* Desserts */}
        <div className="relative bg-white rounded-xl shadow-md p-4 text-left">
          <button
            onClick={() => openStatDetail("dessert")}
            className="absolute bottom-4 right-4"
          >
            <Image
              src="/assets/icons/export.svg"
              alt="detail"
              width={18}
              height={18}
            />
          </button>
          <p className="text-sm text-black">Desserts</p>
          <div className="flex items-center gap-2 mt-1">
            <Image
              src="/assets/icons/cake.svg"
              alt="Desserts"
              width={20}
              height={20}
            />
            <p className="text-lg font-medium">{totalDessertOrders}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start-date"
                className="text-sm text-[var(--neutral-grey7)]"
              >
                Start
              </label>
              <input
                type="date"
                id="start-date"
                className="w-full border rounded-md p-2 text-sm border-[var(--neutral-grey2)] text-[var(--neutral-grey3)]"
              />
            </div>
            <div>
              <label
                htmlFor="finish-date"
                className="text-sm text-[var(--neutral-grey7)]"
              >
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
              <label
                htmlFor="category"
                className="text-sm text-[var(--neutral-grey7)]"
              >
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
              <label
                htmlFor="type"
                className="text-sm text-[var(--neutral-grey7)]"
              >
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
                  <td className="px-4 py-3">{item.no_order}</td>
                  <td className="px-4 py-3">
                    {new Date(item.date).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3">{item.order_type}</td>
                  <td className="px-4 py-3">{item.menu_category}</td>
                  <td className="px-4 py-3">{item.customer_name}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => openTransactionDetail(item)}>
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
            <div className="bg-white px-8 py-6 rounded-xl shadow-md w-full max-w-xl space-y-4 relative">
              <button
                onClick={closeTransactionDetail}
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
                  <span className="text-[var(--neutral-grey6)] font-light">
                    No Order
                  </span>
                  {selectedTransaction.orderNo}
                </p>
                <p className="text-[var(--neutral-grey7)] text-sm mb-1">
                  <span className="text-[var(--neutral-grey6)] font-light">
                    Date
                  </span>
                  {selectedTransaction.date}
                </p>
                <p className="text-[var(--neutral-grey7)] text-sm mb-1">
                  <span className="text-[var(--neutral-grey6)] font-light">
                    Customer Name
                  </span>
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
                          {item.quantity} x {formatRupiah(item.price)}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <hr className=" border border-dashed border-[var(--neutral-grey3)] mb-4 mt-4" />

                {/* Sub Total, Tax, Total, Kembalian */}
                {selectedTransaction && (
                  <>
                    <p className="flex justify-between items-center text-sm mb-2">
                      <span className="text-[var(--neutral-grey5)]">
                        Sub Total
                      </span>
                      <span className="text-[var(--neutral-grey7)]">
                        {formatRupiah(selectedTransaction.subTotal)}
                      </span>
                    </p>
                    <p className="flex justify-between items-center text-sm mb-2">
                      <span className="text-[var(--neutral-grey5)]">Tax</span>
                      <span className="text-[var(--neutral-grey7)]">
                        {formatRupiah(selectedTransaction.tax)}
                      </span>
                    </p>

                    <hr className="border border-dashed border-[var(--neutral-grey3)] mb-4 mt-4" />

                    <p className="flex justify-between items-center mb-4">
                      <span className="text-lg">Total</span>
                      <span className="text-xl font-semibold">
                        {formatRupiah(selectedTransaction.total)}
                      </span>
                    </p>
                    <p className="flex justify-between items-center text-sm mb-2">
                      <span className="text-[var(--neutral-grey5)]">
                        Diterima
                      </span>
                      <span className="text-black">
                        {formatRupiah(selectedTransaction.amountReceived)}
                      </span>
                    </p>
                    <p className="flex justify-between items-center text-sm">
                      <span className="text-[var(--neutral-grey5)]">
                        Kembalian
                      </span>
                      <span className="text-black">
                        {formatRupiah(selectedTransaction.amountChange)}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

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
              {selectedStat.details && selectedStat.details.length > 0 ? (
                <div className="space-y-2">
                  <table className="w-full text-sm mt-2">
                    <thead className="bg-gray-100">
                      <tr className="text-left font-medium">
                        <th className="p-3">Menu Name</th>
                        <th className="p-3">Total Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedStat.details.map((items, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="p-3">{items.name}</td>
                          <td className="p-3">{items.total}</td>
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
    </div>
  );
}
