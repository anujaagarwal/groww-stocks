import React from "react";
import { useTheme } from "../Context/ThemeContext";

// Footer Component
export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="bg-blue-500 text-white py-4" style={theme}>
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base lg:text-lg">
          &copy; {new Date().getFullYear()} Growwstocks
        </p>
        <p className="text-xs md:text-sm lg:text-base">Built By Anuja</p>
      </div>
    </footer>
  );
}
