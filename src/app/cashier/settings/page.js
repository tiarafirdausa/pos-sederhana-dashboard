"use client";
import App from "next/app";
import Image from "next/image";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header*/}
      <h4 className="text-2xl font-medium">Settings</h4>

      {/* Account */}
      <h5 className="text-xl font-medium">Account</h5>
      <div className="flex items-center gap-4">
        <Image
          src="/assets/img/user.png"
          alt="User Avatar"
          height={100}
          width={100}
          className="rounded-full object-cover"
        />
        <button className="px-4 py-2 bg-[var(--blue1-main)] border border-[var(--blue1-main)] rounded-xl text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[var(--blue1-main)]">
          Change Picture
        </button>
        <button className="px-4 py-2 border border-[var(--blue1-main)] rounded-xl text-sm text-[var(--blue1-main)] hover:bg-[var(--neutral-grey2)] focus:outline-none focus:ring-2 focus:ring-[var(--blue1-main)]">
          Delete Picture
        </button>
      </div>

      {/* Account Details */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-[var(--neutral-grey7)]">Email</label>
          <input
            type="email"
            defaultValue="johndoe@gmail.com"
            className="w-full mt-1 p-2 bg-white border border-[var(--neutral-grey4)] rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm text-[var(--neutral-grey7)]">Username</label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full mt-1 p-2 bg-white border border-[var(--neutral-grey4)] rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm text-[var(--neutral-grey7)]">Role</label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full mt-1 bg-white p-2 border border-[var(--neutral-grey4)] rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-[var(--neutral-grey7)]">Status</label>
          <input
            type="email"
            defaultValue="johndoe@gmail.com"
            className="w-full mt-1 p-2 bg-white border border-[var(--neutral-grey4)] rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm text-[var(--neutral-grey7)]">Language</label>
          <select
            defaultValue="English"
            className="w-full mt-1 p-2 bg-white border border-[var(--neutral-grey4)] rounded-lg text-sm"
          >
            <option value="English">English</option>
            <option value="Indonesia">Indonesia</option>
          </select>
        </div>
      </div>

      <hr className="my-4 border-t border-[var(--neutral-grey2)]" />

      {/* Password */}
      <div className="grid grid-cols-3 gap-4">
        <h2 className="col-span-3 text-xl font-medium">Password</h2>
        <div>
          <label className="text-sm text-[var(--neutral-grey7)]">Password</label>
          <input
            type="password"
            defaultValue="johndoe@gmail.com"
            className="w-full mt-1 p-2 bg-white border border-[var(--neutral-grey4)] rounded-xl text-sm"
          />
          <button className="mt-4 px-4 py-2 bg-[var(--blue1-main)] border border-[var(--blue1-main)] rounded-xl text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[var(--blue1-main)]">
            Change Password
          </button>
        </div>
      </div>

      <hr className="my-4 border-t border-[var(--neutral-grey2)]" />

      {/* Appareance */}
      <div className="grid grid-cols-3 gap-4">
        <h2 className="col-span-3 text-xl font-medium">Appearance</h2>
        <div>
          <label className="text-sm text-[var(--neutral-grey7)]">Preference Mode</label>
          <select
            defaultValue="light"
            className="w-full mt-1 p-2 border bg-white border-[var(--neutral-grey4)] rounded-lg text-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-[var(--neutral-grey7)]">Font Size</label>
          <select
            defaultValue="medium"
            className="w-full mt-1 p-2 border bg-white border-[var(--neutral-grey4)] rounded-lg text-sm"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-[var(--neutral-grey7)]">Zoom Display</label>
          <select
            defaultValue="100"
            className="w-full mt-1 p-2 border bg-white border-[var(--neutral-grey4)] rounded-lg text-sm"
          >
            <option value="75">75%</option>
            <option value="100">100%</option>
            <option value="125">125%</option>
            <option value="150">150%</option>
          </select>
        </div>
      </div>

      <hr className="my-4 border-t border-gray-200" />

      <button className="px-4 py-2 bg-[var(--neutral-grey3)] border border-[var(--neutral-grey3)] rounded-lg text-sm text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--neutral-grey3)]">
        Save Changes
      </button>
    </div>
  );
}
