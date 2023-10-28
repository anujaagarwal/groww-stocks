import React from "react";
import { useRouter } from "next/router";
import { LossIcon } from "@/SVGs/LossIcon";
import { ProfitIcon } from "@/SVGs/ProfitIcon";

function StockCard({ name, ticker, price, changePercentage }) {
  const router = useRouter();

  const onClickLearnMore = () => {
    router.push(`/stock/${ticker}`);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md w-90 sm:w-48 md:w-64">
      <h3 className="text-sm sm:text-base font-semibold mb-2">{name}</h3>
      <h3 className="text-sm sm:text-base font-semibold mb-2">{ticker}</h3>

      <p className="text-xl sm:text-2xl font-semibold mt-2">${price}</p>
      <div className="flex items-center">
        <p
          className={`text-sm ${
            changePercentage >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {changePercentage}%
        </p>
        {changePercentage.toString().startsWith("-") ? (
          <LossIcon className="w-6 h-6 text-red-600" />
        ) : (
          <ProfitIcon className="w-6 h-6 text-green-600" />
        )}
      </div>
      <button
        onClick={onClickLearnMore}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none"
      >
        Learn More
      </button>
    </div>
  );
}

export default StockCard;
