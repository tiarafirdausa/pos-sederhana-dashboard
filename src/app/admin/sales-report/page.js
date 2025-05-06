"use client";
import { useState, useEffect } from "react";
import TransactionTable from "../../components/transactionTable";
import Pagination from "../../components/pagination";

const today = new Date().toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const formatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",

    currency: "IDR",
  }).format(amount);
};

const itemsPerPage = 15;

export default function SalesReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

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
        setFilteredData(responseData.orders);
      } catch (e) {
        setError(e);
        console.error("Failed to fetch data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openTransactionDetail = (transaction) => {
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

  const totalPages = Math.ceil(filteredData.length / itemsPerPageState);
  const startIndex = (currentPage - 1) * itemsPerPageState;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPageState
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const setItemsPerPage = (value) => {
    setItemsPerPageState(value);
    setCurrentPage(1);
  };

  // Filter function
  const handleFilter = ({ startDate, endDate, categoryFilter, typeFilter }) => {
    const filtered = data.filter((order) => {
      const orderDate = new Date(order.date).toISOString().slice(0, 10);

      const dateCondition =
        (!startDate || orderDate >= startDate) &&
        (!endDate || orderDate <= endDate);

      const categoryCondition =
        !categoryFilter || order.menu_category === categoryFilter;

      const typeCondition = !typeFilter || order.order_type === typeFilter;

      return dateCondition && categoryCondition && typeCondition;
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header*/}
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-medium">Sales Report</h4>
        <p className="text-sm text-[var(--neutral-grey7)]">{today}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Transaction Table dengan Filter */}
        <TransactionTable
          data={currentItems}
          openTransactionDetail={openTransactionDetail}
          onFilter={handleFilter}
        />

        {/* Pagination*/}
        <div className="flex justify-between items-center mt-4">
          {/* Show Entries Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[var(--neutral-grey7)]">Show:</span>
            <select
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              value={itemsPerPageState}
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
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
      </div>
    </div>
  );
}
