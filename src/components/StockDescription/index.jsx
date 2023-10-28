import React from "react";

export default function StockDescription(props) {
  const { companyName, sector, industry, symbol, description } = props;

  return (
    <div className="bg-opacity-80 bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold">{companyName}</h2>
      <p className="text-gray-600 text-sm">{symbol}</p>

      <div className="bg-red-200 bg-opacity-70 p-2 rounded-md mb-2">
        <p className="text-gray-800 text-sm font-semibold">Sector:</p>
        <p className="text-gray-600 text-sm">{sector}</p>
      </div>

      <div className="bg-red-200 bg-opacity-70 p-2 rounded-md">
        <p className="text-gray-800 text-sm font-semibold">Industry:</p>
        <p className="text-gray-600 text-sm">{industry}</p>
      </div>

      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  );
}
