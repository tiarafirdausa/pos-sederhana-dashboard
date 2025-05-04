// src/utils/auth.js
import jwtDecode from "jwt-decode";

export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error("Token tidak valid", err);
    return null;
  }
}
