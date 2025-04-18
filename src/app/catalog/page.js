"use client";
import Image from "next/image";
import { useState } from "react";

const menuItems = Array(12).fill({
  name: "Gado-gado Special",
  price: "Rp 20.000",
  description:
    "Vegetables, egg, tempe, tofu, lontong, peanut sauce, and kerupuk",
  image: "/assets/img/gado-gado.png",
  category: "Foods",
});

const categories = [
  { label: "All Menu" },
  { label: "Foods", icon: "/assets/icons/reserve-gray.svg" },
  { label: "Beverages", icon: "/assets/icons/coffee-gray.svg" },
  { label: "Dessert", icon: "/assets/icons/cake-gray.svg" },
];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Menu");
  const [showForm, setShowForm] = useState(false); // State untuk menampilkan form
  const [selectedMenu, setSelectedMenu] = useState(null); // State untuk detail menu yang dipilih

  // Filter berdasarkan kategori
  const filteredItems =
    selectedCategory === "All Menu"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  // Toggle form visibility
  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="flex h-screen gap-6">
      {/* Left Section */}
      <div className="w-2/3 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">List Menu</h2>
          <p className="text-sm text-gray-500">
            Total{" "}
            <span className="text-black"> {filteredItems.length} Menu </span>
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6 text-center">
          {categories.map((category) => (
            <button
              key={category.label}
              onClick={() => setSelectedCategory(category.label)}
              className={`flex justify-center items-center gap-2 px-6 py-4 rounded-lg text-xl ${
                selectedCategory === category.label
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 hover:bg-gray-300 text-gray-400"
              }`}
            >
              {category.icon && (
                <Image
                  src={category.icon}
                  alt={category.label}
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
              className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-40 w-full mb-2 overflow-hidden rounded">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
                <span className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-3xl ">
                  {item.category}
                </span>
              </div>
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="text-xs text-gray-500">{item.description}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-blue-600 font-bold text-sm">
                  {item.price}{" "}
                  <span className="text-gray-500 text-xs">/ portion</span>
                </p>
                <button
                  onClick={() => {
                    setSelectedMenu(item); // buka detail
                    setShowForm(false); // tutup form
                  }}
                >
                  <Image
                    src="/assets/icons/maximize.svg"
                    alt="maximize"
                    width={18}
                    height={18}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section (Add Menu) */}
      <div className="w-1/3 p-6 bg-white rounded-lg flex flex-col items-center justify-start">
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {showForm ? "Add Menu" : selectedMenu ? "Menu Detail" : "Add Menu"}
          </h2>
          <button
            onClick={() => {
                if (selectedMenu || showForm) {
                  setSelectedMenu(null); // tutup detail
                  setShowForm(false);    // tutup form
                } else {
                  setShowForm(true);     // buka form
                }
              }}
            className="justify-center items-center w-10 h-10 bg-blue-600 text-white rounded-lg text-xl font-bold"
          >
            {selectedMenu || showForm ? "×" : "+"}
          </button>
        </div>

        <hr className="w-full border-t border-gray-200 my-2" />

        {/* Jika detail menu ditampilkan */}
        {selectedMenu && (
          <div className="w-full mt-2">
            <form className="w-full flex flex-col gap-4">
              {/* Image */}
              <div>
                <Image
                  src={selectedMenu.image}
                  alt={selectedMenu.name}
                  width={300}
                  height={200}
                  className="rounded-md"
                />
              </div>

              {/* Name */}
              <div>
                <label className="text-gray-700">Name</label>
                <input
                  type="text"
                  value={selectedMenu.name}
                  readOnly
                  className="w-full mt-1 p-3 border border-gray-200 rounded-md text-black"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-gray-700">Category</label>
                <select
                  value={selectedMenu.category}
                  disabled
                  className="w-full mt-1 p-3 border border-gray-200 rounded-md text-black"
                >
                  <option value="Foods">Foods</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="text-gray-700">Price</label>
                <input
                  type="text"
                  value={selectedMenu.price}
                  readOnly
                  className="w-full mt-1 p-3 border border-gray-200 rounded-md  text-black"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-gray-700">Description</label>
                <textarea
                  value={selectedMenu.description}
                  readOnly
                  className="w-full mt-1 p-3 border border-gray-200 rounded-md  text-black"
                />
              </div>
            </form>
          </div>
        )}

        {/* Tampilkan form jika showForm true */}
        {showForm && (
          <form className="w-full flex flex-col gap-4 ">
            <div>
              <label className="text-gray-700">Image</label>
              <div className="w-full mt-1 p-12 border border-dashed border-blue-500 rounded-md text-center cursor-pointer text-gray-400 hover:border-blue-400 transition">
                <label htmlFor="imageUpload" className="cursor-pointer block">
                  Drag and drop here or{" "}
                  <span className="text-blue-600 underline">choose file</span>
                </label>
                <input type="file" id="imageUpload" className="hidden" />
              </div>
            </div>
            <div>
              <label className="text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter name here..."
                className="w-full mt-1 p-3 border border-gray-200 rounded-md text-gray-300"
              />
            </div>
            <div>
              <label htmlFor="category" className=" text-gray-700">
                Category
              </label>
              <select
                id="category"
                defaultValue=""
                className="w-full border rounded-md mt-1 p-3 border-gray-200 text-gray-300"
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
              <label className="text-gray-700">Price</label>
              <input
                type="text"
                placeholder="Enter price here..."
                className="w-full p-3 mt-1 border border-gray-200 rounded-md text-gray-300"
              />
            </div>
            <div>
              <label className="text-gray-700">Description</label>
              <textarea
                placeholder="Enter description here..."
                className="w-full p-3 mt-1 border border-gray-200 rounded-md text-gray-300"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 mt-6 text-white rounded-md p-2"
            >
              Save Menu
            </button>
          </form>
        )}

        {/* Tampilkan pesan jika showForm false */}
        {!showForm && !selectedMenu && (
          <div className="flex-grow flex justify-center items-center">
            <p className="text-gray-400 text-sm">Add Menu here</p>
          </div>
        )}
      </div>
    </div>
  );
}
