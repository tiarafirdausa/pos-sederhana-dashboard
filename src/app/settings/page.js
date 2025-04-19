"use client";
import App from "next/app";
import Image from "next/image";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header*/}
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Account */}
      <h2 className="text-xl font-semibold">Account</h2>
      <div className="flex items-center gap-4">
        <Image
          src="/assets/img/user.png"
          alt="User Avatar"
          height={100}
          width={100}
          className="rounded-full object-cover"
        />
        <button className="px-4 py-2 bg-blue-500 border border-blue-500 rounded-lg text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Change Picture
        </button>
        <button className="px-4 py-2 border border-blue-500 rounded-lg text-sm text-blue-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Delete Picture
        </button>
      </div>

      {/* Account Details */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-500">Email</label>
          <input
            type="email"
            defaultValue="johndoe@gmail.com"
            className="w-full mt-1 p-2 bg-white border border-gray-400 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">Username</label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full mt-1 p-2 bg-white border border-gray-400 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">Role</label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full mt-1 bg-white p-2 border border-gray-400 rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-500">Status</label>
          <input
            type="email"
            defaultValue="johndoe@gmail.com"
            className="w-full mt-1 p-2 bg-white border border-gray-400 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">Language</label>
          <select
            defaultValue="English"
            className="w-full mt-1 p-2 bg-white border border-gray-400 rounded-lg text-sm"
          >
            <option value="English">English</option>
            <option value="Indonesia">Indonesia</option>
          </select>
        </div>
      </div>

      <hr className="my-4 border-t border-gray-200" />

      {/* Password */}
      <div className="grid grid-cols-3 gap-4">
        <h2 className="col-span-3 text-xl font-semibold">Password</h2>
        <div>
          <label className="text-sm text-gray-500">Password</label>
          <input
            type="password"
            defaultValue="johndoe@gmail.com"
            className="w-full mt-1 p-2 bg-white border border-gray-400 rounded-lg text-sm"
          />
          <button className="mt-4 px-4 py-2 bg-blue-500 border border-blue-500 rounded-lg text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Change Picture
          </button>
        </div>
      </div>

      <hr className="my-4 border-t border-gray-200" />

      {/* Appareance */}
      <div className="grid grid-cols-3 gap-4">
        <h2 className="col-span-3 text-xl font-semibold">Appearance</h2>
        <div>
          <label className="text-sm text-gray-500">Preference Mode</label>
          <select
            defaultValue="light"
            className="w-full mt-1 p-2 border bg-white border-gray-400 rounded-lg text-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-500">Font Size</label>
          <select
            defaultValue="medium"
            className="w-full mt-1 p-2 border bg-white border-gray-400 rounded-lg text-sm"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-500">Zoom Display</label>
          <select
            defaultValue="100"
            className="w-full mt-1 p-2 border bg-white border-gray-400 rounded-lg text-sm"
          >
            <option value="75">75%</option>
            <option value="100">100%</option>
            <option value="125">125%</option>
            <option value="150">150%</option>
          </select>
        </div>
      </div>

      <hr className="my-4 border-t border-gray-200" />

      <button className="px-4 py-2 border border-blue-500 rounded-lg text-sm text-blue-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Save Changes
      </button>
    </div>
  );
}
