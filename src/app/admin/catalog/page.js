"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

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

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("all"); // State untuk kategori yang dipilih
  const [showForm, setShowForm] = useState(false); // State untuk menampilkan form
  const [selectedMenu, setSelectedMenu] = useState(null); // State untuk detail menu yang dipilih
  const [isEditMode, setIsEditMode] = useState(false); // State untuk mode edit
  const [menuItems, setMenuItems] = useState([]); // State untuk menyimpan data menu dari API
  const [loading, setLoading] = useState(false); // Untuk menandakan jika sedang mengambil data

  const [formData, setFormData] = useState({
    image: null,
    name: "",
    category: "",
    price: "",
    description: "",
  });

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Add this to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("name", formData.name);

    try {
      const response = await fetch("http://localhost:5000/menu", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setShowForm(false);
        setFormData({
          image: null,
          name: "",
          category: "",
          price: "",
          description: "",
        });
        const res = await fetch("http://localhost:5000/menu");
        const newMenus = await res.json();
        setMenuItems(newMenus);
      } else {
        console.error("Failed to add menu");
      }
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };

  // Handle form submission for edit mode
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // Buat FormData untuk dikirim
    const updateData = new FormData();
    if (formData.image) {
      updateData.append("image", formData.image);
    }
    updateData.append("name", formData.name);
    updateData.append("category", formData.category);
    updateData.append("price", formData.price);
    updateData.append("description", formData.description);
    try {
      console.log("Submitting form with data:", formData);
      const response = await fetch(
        `http://localhost:5000/menu/${selectedMenu.id}`,
        {
          method: "PUT",
          body: updateData,
        }
      );
      if (response.ok) {
        const updatedDetailRes = await fetch(`http://localhost:5000/menu/${selectedMenu.id}`);
        const updatedDetail = await updatedDetailRes.json();
        setMenuItems((prev) =>
          prev.map((item) => (item.id === updatedDetail.id ? updatedDetail : item))
        );
        setSelectedMenu(updatedDetail);
        setIsEditMode(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to update menu:", errorData);
      }
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  // Handle edit menu value
  useEffect(() => {
    if (selectedMenu && isEditMode) {
      console.log("Loading menu for edit:", selectedMenu); 
      setFormData({
        image: null,
        name: selectedMenu.name || "",
        category: selectedMenu.category || "",
        price: selectedMenu.price || "",
        description: selectedMenu.description || "",
      });
    }
  }, [selectedMenu, isEditMode]);

  // Handle image file change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

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

  // Fetch detail menu berdasarkan selectedMenu
  useEffect(() => {
    if (selectedMenu) {
      const fetchMenuDetail = async () => {
        setLoading(true);
        try {
          console.log("Selected Menu ID:", selectedMenu?.id);
          const response = await fetch(
            `http://localhost:5000/menu/${selectedMenu.id}`
          );
          const data = await response.json();
        } catch (error) {
          console.error("Failed to fetch selected menu data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMenuDetail();
    }
  }, [selectedMenu]);

  // Delete menu item
  const deleteMenuItem = async (menuId) => {
    try {
      const response = await fetch(`http://localhost:5000/menu/${menuId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMenuItems(menuItems.filter((item) => item.id !== menuId));
        setSelectedMenu(null);
      } else {
        console.error("Failed to delete menu");
      }
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  // Filter berdasarkan kategori
  const filteredItems =
    selectedCategory === "all"
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
              className={`bg-white rounded-lg p-2 hover:shadow-md transition ${
                selectedMenu && selectedMenu.id === item.id
                  ? "border-2 border-blue-500"
                  : ""
              }`}
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
                  {item.price}{" "}
                  <span className="text-[var(--neutral-grey5)] font-light text-xs">
                    / portion
                  </span>
                </p>
                <button
                  onClick={() => {
                    if (selectedMenu && selectedMenu.id === item.id) {
                      setSelectedMenu(null);
                      setIsEditMode(false);
                    } else {
                      setSelectedMenu(item);
                      setIsEditMode(false);
                      setShowForm(false);
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
      <div className="w-1/3 p-5 bg-white rounded-2xl flex flex-col items-center justify-start ">
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {showForm ? "Add Menu" : selectedMenu ? "Menu Detail" : "Add Menu"}
          </h2>
          <div className="flex items-center gap-4">
            {/* Edit Button */}
            {selectedMenu && !isEditMode && (
              <button
                onClick={() => {
                  setIsEditMode(true);
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
                  if (selectedMenu) {
                    deleteMenuItem(selectedMenu.id);
                  }
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
                    setShowForm(false);
                  } else {
                    setShowForm(true);
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
        {selectedMenu && !isEditMode && loading && <p>Loading...</p>}
        {selectedMenu && !isEditMode && !loading && (
          <div className="w-full mt-2">
            <form className="w-full flex flex-col gap-4">
              <div>
                <Image
                  src={`http://localhost:5000/${selectedMenu.image}`}
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
                  <option value="food">Foods</option>
                  <option value="beverage">Beverages</option>
                  <option value="dessert">Dessert</option>
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
              onSubmit={handleEditSubmit}
            >
              <div className="text-center">
                {formData.image ? (
                  <Image
                    src={URL.createObjectURL(formData.image)}
                    alt="preview"
                    width={400}
                    height={300}
                    className="rounded-md mx-auto mb-6"
                  />
                ) : (
                  <Image
                    src={`http://localhost:5000/${selectedMenu.image}`}
                    alt={selectedMenu.name}
                    width={400}
                    height={300}
                    className="rounded-md mx-auto mb-6"
                  />
                )}

                <label
                  htmlFor="editImageUpload"
                  className="p-3 cursor-pointer text-sm text-blue-600 border border-blue-700 rounded-md text-center"
                >
                  Change Photo
                </label>
                <input
                  type="file"
                  id="editImageUpload"
                  name="image"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <label className="text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full mt-1 p-3 border border-gray-200 rounded-md text-black"
                />
              </div>

              <div>
                <label className="text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full mt-1 p-3 border border-gray-200 rounded-md text-black cursor-pointer"
                >
                  <option value="food">Foods</option>
                  <option value="beverage">Beverages</option>
                  <option value="dessert">Dessert</option>
                </select>
              </div>

              <div>
                <label className="text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full mt-1 p-3 border border-gray-200 rounded-md text-black"
                />
              </div>

              <div>
                <label className="text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
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

        {/* Tampilkan form add menu jika showForm true */}
        {showForm && (
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label className="text-gray-700">Image</label>
              <div className="w-full mt-1 p-12 border border-dashed border-blue-500 rounded-md text-center cursor-pointer text-gray-400 hover:border-blue-400 transition">
                <label htmlFor="imageUpload" className="cursor-pointer block">
                  Drag and drop here or{" "}
                  <span className="text-blue-600 underline">choose file</span>
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  name="image"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div>
              <label className="text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Enter name here..."
                className="w-full mt-1 p-3 border border-gray-200 rounded-md text-gray-300"
              />
            </div>
            <div>
              <label htmlFor="category" className=" text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
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
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                placeholder="Enter price here..."
                className="w-full p-3 mt-1 border border-gray-200 rounded-md text-gray-300"
              />
            </div>
            <div>
              <label className="text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
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
