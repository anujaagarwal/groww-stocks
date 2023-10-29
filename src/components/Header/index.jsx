// Imports
import React from "react";
import { LossIcon } from "@/components/Icons/LossIcon";
import { ProfitIcon } from "@/components/Icons/ProfitIcon";

// Header Component
export default function Header(props) {
  const { image, symbol, exchangeShortName, changes, price, companyName } =
    props;
  return (
    <section className="bg-white p-4 m-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
      <div className="flex flex-col items-center sm:flex-row sm:items-center lg:flex-row lg:items-center">
        <div className="mb-4 sm:mb-0 lg:mb-0 sm:mr-4 lg:mr-4">
          <img
            src={image}
            alt={symbol}
            className="w-16 h-16 object-cover rounded-full"
          />
        </div>
        <div className="text-center sm:text-left lg:text-left sm:flex-1 lg:flex-1">
          <h1 className="text-black text-xl font-bold">{companyName}</h1>
          <h1 className="text-gray-600">
            {symbol}, {exchangeShortName}
          </h1>
        </div>
        <div className="flex flex-col items-end sm:items-start lg:items-start sm:flex-1 lg:flex-1">
          <h2 className="text-2xl font-bold">${price}</h2>
          <div className="flex items-center text-sm">
            <h3
              className={
                changes.toString().startsWith("-")
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {changes}
            </h3>
            {changes.toString().startsWith("-") ? <LossIcon /> : <ProfitIcon />}
          </div>
        </div>
      </div>
    </section>
  );
}
