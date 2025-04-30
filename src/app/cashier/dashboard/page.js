"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const categories = [
  { label: "All Menu", value: "all" },
  { label: "Foods", value: "food", icon: "/assets/icons/reserve-gray.svg" },
  {
    label: "Beverages",
    value: "beverage",
    icon: "/assets/icons/coffee-gray.svg",
  },
  { label: "Dessert", value: "dessert", icon: "/assets/icons/cake-gray.svg" },
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [orderItems, setOrderItems] = useState([]); // untuk mencatat pesanan
  const [orderType, setOrderType] = useState("dine-in"); // defaultnya 'dine-in'
  const [customerName, setCustomerName] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]); // State untuk menyimpan data menu dari API

  // Fetch menu data from API
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("http://localhost:5000/menu");
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
      }
    };

    fetchMenus();
  }, []);

  const openDetailMenu = (menu) => {
    setSelectedMenu(menu); // Menyimpan menu yang dipilih
  };

  const closeDetailMenu = () => {
    setSelectedMenu(null); // Menutup detail menu
  };

  // Filter berdasarkan kategori
  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  // Fungsi tambah ke order list
  const handleAddToOrder = (menu) => {
    const existingOrder = orderItems.find((order) => order.name === menu.name);
    if (existingOrder) {
      setOrderItems(
        orderItems.map((order) =>
          order.name === menu.name
            ? { ...order, quantity: order.quantity + 1 }
            : order
        )
      );
    } else {
      setOrderItems([...orderItems, { ...menu, quantity: 1 }]);
    }
  };

  // Fungsi hapus 1 quantity
  const handleDecreaseOrder = (menu) => {
    const existingOrder = orderItems.find((order) => order.name === menu.name);
    if (existingOrder.quantity === 1) {
      setOrderItems(orderItems.filter((order) => order.name !== menu.name));
    } else {
      setOrderItems(
        orderItems.map((order) =>
          order.name === menu.name
            ? { ...order, quantity: order.quantity - 1 }
            : order
        )
      );
    }
  };

  // Fungsi hapus dari list
  const handleDeleteOrder = (item) => {
    setOrderItems(orderItems.filter((order) => order.name !== item.name));
  };

  // Hitung subtotal
  const subtotal = orderItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/\D/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const tax = 5000; // fix 5.000 misal
  const total = subtotal + tax;

  return (
    <div className="flex h-screen gap-4">
      {/* Left Section */}
      <div className="w-2/3 overflow-y-auto">
        {/* Filter Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6 text-center">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex justify-center items-center gap-2 px-6 py-4 rounded-lg text-xl cursor-pointer ${
                selectedCategory === category.value
                  ? "bg-[var(--blue1-main)] text-white"
                  : "border border-[var(--neutral-grey3)] hover:bg-[var(--neutral-grey3)] text-[var(--neutral-grey4)]"
              }`}
            >
              {category.icon && (
                <Image
                  src={category.icon}
                  alt={category.value}
                  width={20}
                  height={20}
                />
              )}
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-2 hover:shadow-md transition cursor-pointer"
              onClick={() => handleAddToOrder(item)}
            >
              <div className="relative h-40 w-full mb-2 overflow-hidden rounded">
                <Image
                  src={`http://localhost:5000/${item.image}`}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
                <span className="absolute top-1 right-1 bg-[var(--blue1-main)] text-white text-xs px-2 py-1 rounded-3xl">
                  {item.category}
                </span>
              </div>
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-xs font-light text-[var(--neutral-grey5)]">
                {item.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[var(--blue1-main)] font-semibold text-sm">
                  {item.price}
                </p>
                <button onClick={() => openDetailMenu(item)}>
                  <Image
                    src="/assets/icons/maximize.svg"
                    alt="maximize"
                    width={18}
                    height={18}
                    className="cursor-pointer"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section (List Order) */}
      <div className="w-1/3 p-5 bg-white rounded-2xl flex flex-col">
        <h2 className="text-xl font-semibold mb-4">List Order</h2>
        {/* Button Dine In & Take Away */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setOrderType("dine-in")}
            className={`flex-1 py-4 rounded-lg font-semibold border cursor-pointer
            ${
              orderType === "dine-in"
                ? "bg-blue-500 text-white border-blue-500"
                : "border-blue-500 text-blue-500 hover:bg-blue-100"
            }
          `}
          >
            Dine In
          </button>
          <button
            onClick={() => setOrderType("take-away")}
            className={`flex-1 py-4 rounded-lg font-semibold border cursor-pointer
            ${
              orderType === "take-away"
                ? "bg-blue-500 text-white border-blue-500"
                : "border-blue-500 text-blue-500 hover:bg-blue-100"
            }
          `}
          >
            Take Away
          </button>
        </div>

        {/* Input Customer Name */}
        <div className="mb-4">
          <label className="mb-2">Customer Name</label>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <hr className="w-full border-t border-gray-200 mb-4" />

        <div className="flex flex-col gap-4 overflow-y-auto flex-grow">
          {orderItems.length === 0 ? (
            <p className="text-gray-400 text-center">No Order Yet</p>
          ) : (
            orderItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                {/* Kiri: Gambar + Info */}
                <div className="flex items-center gap-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-400">
                      Rp {item.price.toLocaleString()}
                    </p>

                    {/* Button Add Notes */}
                    <button
                      onClick={() => handleAddNotes(item)}
                      className="mt-1 text-blue-500 hover:underline flex items-center text-xs gap-1"
                    >
                      <Image
                        src="/assets/icons/edit-2.svg"
                        alt="Add Notes"
                        width={12}
                        height={12}
                      />
                    </button>
                  </div>
                </div>

                {/* Kanan: Qty Control + Delete */}
                <div className="flex flex-col items-end gap-2">
                  {/* Tombol Delete */}
                  <button
                    onClick={() => handleDeleteOrder(item)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Image
                      src="/assets/icons/trash.svg"
                      alt="Delete"
                      width={20}
                      height={20}
                    />
                  </button>

                  {/* Qty Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecreaseOrder(item)}
                      className={`border rounded-full w-6 h-6 flex items-center justify-center
                ${
                  item.quantity === 1
                    ? "border-gray-400 text-gray-400 cursor-not-allowed"
                    : "border-blue-500 text-blue-500 hover:bg-blue-100"
                }
              `}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleAddToOrder(item)}
                      className="border border-blue-500 text-blue-500 rounded-full w-6 h-6 flex items-center justify-center hover:bg-blue-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="mt-4">
          {orderItems.length !== 0 && (
            <div className="bg-[var(--neutral-grey1)] p-6">
              <div className="flex justify-between font-semibold mb-2">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>Rp {tax.toLocaleString()}</span>
              </div>
              <hr className="border border-dashed border-[var(--neutral-grey3)] mb-4 mt-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
            </div>
          )}
          {/* Tombol Pay */}
          <button className="mt-4 w-full bg-[var(--blue1-main)] text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-600">
            Pay
          </button>
        </div>
      </div>

      {/* Detail Menu Modal */}
      {selectedMenu && (
        <div className="fixed inset-0 bg-black/30 shadow-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-[90%] max-w-md space-y-4 relative">
            {/* Close Button */}
            <button
              onClick={closeDetailMenu}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
              aria-label="Close"
            >
              &times;
            </button>

            <h4 className="text-2xl font-medium">Detail Menu</h4>

            <hr className="border border-[var(--neutral-grey3)] mb-4" />

            <div className="relative h-50 w-full mb-2 overflow-hidden rounded">
              <Image
                src={selectedMenu.image}
                alt={selectedMenu.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className=" top-1 right-1 bg-[var(--blue1-main)] text-white text-xs px-2 py-1 rounded-3xl">
              {selectedMenu.category}
            </p>
            <h3 className="text-lg font-medium">{selectedMenu.name}</h3>
            <p className="text-xs font-light text-[var(--neutral-grey5)]">
              {selectedMenu.description}
            </p>
            <p className="text-[var(--blue1-main)] font-semibold text-sm">
              {selectedMenu.price}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
