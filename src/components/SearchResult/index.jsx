import React from "react";

// SearchResult component
export default function SearchResult({ symbol, name }) {
  return (
    <div
      key={symbol}
      className="bg-white p-2 shadow-md my-4 w-full flex justify-content flex-col"
    >
      <h3 className="text-black text-lg font-semibold">{name}</h3>
      <p className="text-gray-600 pl-4">{symbol}</p>
    </div>
  );
}
