"use client";
import Image from "next/image";
import { useState } from "react";

const menuItems = [
  {
    name: "Gado-gado Special",
    price: "Rp 20.000",
    description:
      "Vegetables, egg, tempe, tofu, lontong, peanut sauce, and kerupuk",
    image: "/assets/img/gado-gado.png",
    category: "Foods",
  },
  {
    name: "Nasi Goreng",
    price: "Rp 25.000",
    description: "Fried rice with chicken, shrimp, and vegetables",
    image: "/assets/img/gado-gado.png", // Same image for all
    category: "Foods",
  },
  {
    name: "Soto Ayam",
    price: "Rp 18.000",
    description: "Traditional chicken soup with rice and boiled egg",
    image: "/assets/img/gado-gado.png", // Same image for all
    category: "Foods",
  },
  {
    name: "Es Teh Manis",
    price: "Rp 5.000",
    description: "Sweet iced tea",
    image: "/assets/img/gado-gado.png", // Same image for all
    category: "Beverages",
  },
  {
    name: "Kopi Hitam",
    price: "Rp 10.000",
    description: "Black coffee with no sugar",
    image: "/assets/img/gado-gado.png", // Same image for all
    category: "Beverages",
  },
  {
    name: "Cake Coklat",
    price: "Rp 15.000",
    description: "Rich chocolate cake with a soft texture",
    image: "/assets/img/gado-gado.png", // Same image for all
    category: "Dessert",
  },
  {
    name: "Pisang Goreng",
    price: "Rp 12.000",
    description: "Fried banana served with chocolate syrup",
    image: "/assets/img/gado-gado.png", // Same image for all
    category: "Dessert",
  },
  {
    name: "Mie Goreng",
    price: "Rp 22.000",
    description: "Fried noodles with vegetables and chicken",
    image: "/assets/img/gado-gado.png", // Same image for all
    category: "Foods",
  },
  {
    name: "Es Jeruk",
    price: "Rp 8.000",
    description: "Fresh orange juice with ice",
    image: "/assets/img/gado-gado.png", // Same image for all
    category: "Beverages",
  },
  {
    name: "Puding Kelapa",
    price: "Rp 10.000",
    description: "Coconut pudding with a creamy texture",
    image: "/assets/img/gado-gado.png", // Same image for all
    category: "Dessert",
  },
  {
    name: "Ayam Penyet",
    price: "Rp 30.000",
    description: "Fried chicken with sambal and rice",
    image: "/assets/img/gado-gado.png", // Same image for all
    category: "Foods",
  },
  {
    name: "Teh Tarik",
    price: "Rp 7.000",
    description: "Traditional Malaysian pulled tea",
    image: "/assets/img/gado-gado.png", // Same image for all
    category: "Beverages",
  },
  {
    name: "Pavlova",
    price: "Rp 20.000",
    description: "Merengue-based dessert with fresh fruits",
    image: "/assets/img/gado-gado.png", // Same image for all
    category: "Dessert",
  },
];

const categories = [
  { label: "All Menu" },
  { label: "Foods", icon: "/assets/icons/reserve-gray.svg" },
  { label: "Beverages", icon: "/assets/icons/coffee-gray.svg" },
  { label: "Dessert", icon: "/assets/icons/cake-gray.svg" },
];

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("All Menu"); // State untuk kategori yang dipilih
  const [showForm, setShowForm] = useState(false); // State untuk menampilkan form
  const [selectedMenu, setSelectedMenu] = useState(null); // State untuk detail menu yang dipilih
  const [isEditMode, setIsEditMode] = useState(false); // State untuk mode edit

  // Filter berdasarkan kategori
  const filteredItems =
    selectedCategory === "All Menu"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  // Toggle form visibility
  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="flex h-screen gap-4">
      {/* Left Section */}
      <div className="w-2/3 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">List Menu</h2>
          <p className="text-sm font text-[var(--neutral-grey5)]">
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
              className={`flex justify-center items-center gap-2 px-6 py-4 rounded-lg text-xl cursor-pointer ${
                selectedCategory === category.label
                  ? "bg-[var(--blue1-main)] text-white"
                  : "border border-[var(--neutral-grey3)] hover:bg-[var(--neutral-grey3)] text-[var(--neutral-grey4)]"
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
              className={`bg-white rounded-lg p-2 hover:shadow-md transition ${
                selectedMenu && selectedMenu.name === item.name
                  ? "border-2 border-blue-500"
                  : ""
              }`}
            >
              <div className="relative h-40 w-full mb-2 overflow-hidden rounded">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
                <span className="absolute top-1 right-1 bg-[var(--blue1-main)] text-white text-xs px-2 py-1 rounded-3xl">
                  {item.category}
                </span>
              </div>
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-xs font-light text-[var(--neutral-grey5)]">{item.description}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-[var(--blue1-main)] font-semibold text-sm">
                  {item.price}{" "}
                  <span className="text-[var(--neutral-grey5)] font-light text-xs">/ portion</span>
                </p>
                <button
                  onClick={() => {
                    if (selectedMenu && selectedMenu.name === item.name) {
                      setSelectedMenu(null); // klik ulang > tutup detail
                      setIsEditMode(false); // pastikan mode edit tertutup
                    } else {
                      setSelectedMenu(item); // klik menu lain > buka detail baru
                      setIsEditMode(false); // pastikan mode edit tertutup
                      setShowForm(false); // pastikan form tertutup
                    }
                  }}
                >
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

      {/* Right Section (Add Menu) */}
      <div className="w-1/3 p-5 bg-white rounded-2xl flex flex-col items-center justify-start">
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {showForm ? "Add Menu" : selectedMenu ? "Menu Detail" : "Add Menu"}
          </h2>
          <div className="flex items-center gap-4">
            {/* Edit Button */}
            {selectedMenu && !isEditMode && (
              <button
                onClick={() => {
                  setIsEditMode(true); // Activate edit mode
                }}
                className="p-2 border border-yellow-500 rounded-md cursor-pointer"
              >
                <Image
                  src="/assets/icons/edit-2.svg"
                  alt="edit"
                  width={18}
                  height={18}
                />
              </button>
            )}

            {/* Delete Button */}
            {selectedMenu && !isEditMode && (
              <button
                onClick={() => {
                  // Logic for delete action
                  console.log("Delete menu");
                }}
                className="p-2 border border-red-500 rounded-md cursor-pointer"
              >
                <Image
                  src="/assets/icons/trash.svg"
                  alt="delete"
                  width={18}
                  height={18}
                />
              </button>
            )}

            {/* Add Menu + Close Button */}
            {!selectedMenu && (
              <button
                onClick={() => {
                  if (showForm) {
                    setShowForm(false); // Close form
                  } else {
                    setShowForm(true); // Open form
                  }
                }}
                className={`justify-center items-center w-10 h-10 rounded-lg text-xl cursor-pointer ${
                  showForm
                    ? "text-gray-500"
                    : "bg-blue-600 text-white font-bold"
                }`}
              >
                {showForm ? "x" : "+"}
              </button>
            )}
          </div>
        </div>

        <hr className="w-full border-t border-gray-200 my-2" />

        {/* Jika detail menu ditampilkan */}
        {selectedMenu && !isEditMode && (
          <div className="w-full mt-2">
            <form className="w-full flex flex-col gap-4">
              <div>
                <Image
                  src={selectedMenu.image}
                  alt={selectedMenu.name}
                  width={400}
                  height={300}
                  className="rounded-md mx-auto"
                />
              </div>
              <div>
                <label className="text-gray-700">Name</label>
                <input
                  type="text"
                  value={selectedMenu.name}
                  readOnly
                  className="w-full mt-1 p-3 border border-gray-200 rounded-md text-black"
                />
              </div>
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
              <div>
                <label className="text-gray-700">Price</label>
                <input
                  type="text"
                  value={selectedMenu.price}
                  readOnly
                  className="w-full mt-1 p-3 border border-gray-200 rounded-md text-black"
                />
              </div>
              <div>
                <label className="text-gray-700">Description</label>
                <textarea
                  value={selectedMenu.description}
                  readOnly
                  className="w-full mt-1 p-3 border border-gray-200 rounded-md text-black"
                />
              </div>
            </form>
          </div>
        )}

        {/* Jika dalam mode edit */}
        {selectedMenu && isEditMode && (
          <div className="w-full mt-2">
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              // Simpan perubahan di sini (belum ada handler penyimpanan nyata)
              console.log("Save edited menu");
              setIsEditMode(false); // Kembali ke mode detail
            }}
          >
            <div className="text-center">
              <Image
                src={selectedMenu.image}
                alt={selectedMenu.name}
                width={400}
                height={300}
                className="rounded-md mx-auto mb-6"
              />
              <label
                htmlFor="editImageUpload"
                className="p-3 cursor-pointer text-sm text-blue-600 border border-blue-700 rounded-md text-center"
              >
                Change Photo
              </label>
              <input type="file" id="editImageUpload" className="hidden" />
            </div>

            <div>
              <label className="text-gray-700">Name</label>
              <input
                type="text"
                defaultValue={selectedMenu.name}
                className="w-full mt-1 p-3 border border-gray-200 rounded-md text-black"
              />
            </div>

            <div>
              <label className="text-gray-700">Category</label>
              <select
                defaultValue={selectedMenu.category}
                className="w-full mt-1 p-3 border border-gray-200 rounded-md text-black cursor-pointer"
              >
                <option value="Foods">Foods</option>
                <option value="Beverages">Beverages</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700">Price</label>
              <input
                type="text"
                defaultValue={selectedMenu.price}
                className="w-full mt-1 p-3 border border-gray-200 rounded-md text-black"
              />
            </div>

            <div>
              <label className="text-gray-700">Description</label>
              <textarea
                defaultValue={selectedMenu.description}
                className="w-full mt-1 p-3 border border-gray-200 rounded-md text-black"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 mt-6 p-3 text-white rounded-md cursor-pointer"
            >
              Save
            </button>
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
                className="w-full border rounded-md mt-1 p-3 border-gray-200 text-gray-300 cursor-pointer"
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
              className="bg-blue-600 mt-6 text-white rounded-md p-2 cursor-pointer"
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
