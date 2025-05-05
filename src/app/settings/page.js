"use client";
import App from "next/app";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);   

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token); 
      setLoading(true); 
      setError(null); 
  
      if (!token) {
        setError("Token tidak ditemukan.");
        setLoading(false);
        return;
      }
  
      try {
        const res = await fetch("http://localhost:5000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUser(data.user);
        console.log("User data:", data.user); 
      } catch (error) {
        console.error("Gagal fetch profile:", error);
        setError("Gagal memuat profil. Silakan coba lagi nanti.");
      } finally {
        setLoading(false); 
      }
    };
  
    fetchProfile();
  }, []);
  
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
      {user && (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-[var(--neutral-grey7)]">Email</label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full mt-1 p-2 bg-white border border-[var(--neutral-grey4)] rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-[var(--neutral-grey7)]">Username</label>
            <input
              type="text"
              defaultValue={user.username}
              className="w-full mt-1 p-2 bg-white border border-[var(--neutral-grey4)] rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-[var(--neutral-grey7)]">Role</label>
            <input
              type="text"
              defaultValue={user.role}
              className="w-full mt-1 bg-white p-2 border border-[var(--neutral-grey4)] rounded-lg text-sm"
            />
          </div>
        </div>
      )}

      {user && (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-[var(--neutral-grey7)]">Status</label>
            <input
              type="email"
              defaultValue={user.status}
              className="w-full mt-1 p-2 bg-white border border-[var(--neutral-grey4)] rounded-lg text-sm"
            />
          </div>
        </div>
      )}

      <hr className="my-4 border-t border-[var(--neutral-grey2)]" />

      {/* Password */}
      <div className="grid grid-cols-3 gap-4">
        <h2 className="col-span-3 text-xl font-medium">Password</h2>
        <div>
          <label className="text-sm text-[var(--neutral-grey7)]">Password</label>
          <input
            type="password"
            placeholder="********" 
            className="w-full mt-1 p-2 bg-white border border-[var(--neutral-grey4)] rounded-xl text-sm"
          />
          <button className="mt-4 px-4 py-2 bg-[var(--blue1-main)] border border-[var(--blue1-main)] rounded-xl text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[var(--blue1-main)]">
            Change Password
          </button>
        </div>
      </div>

      <hr className="my-4 border-t border-gray-200" />

      <button className="px-4 py-2 bg-[var(--neutral-grey3)] border border-[var(--neutral-grey3)] rounded-lg text-sm text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--neutral-grey3)]">
        Save Changes
      </button>
    </div>
  );
}