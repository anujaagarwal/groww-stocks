import React from "react";

// SearchResult component
export default function SearchResult({ symbol, name }) {
  return (
    <div
      key={symbol}
      className="bg-white p-2 shadow-md my-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
    >
      <h3 className="text-black text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{symbol}</p>
    </div>
  );
}
