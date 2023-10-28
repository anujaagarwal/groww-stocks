import { LossIcon } from "@/SVGs/LossIcon";
import { ProfitIcon } from "@/SVGs/ProfitIcon";
import React from "react";
import { useRouter } from "next/router";

function StockCard({ name, ticker, price, changePercentage }) {
  const router = useRouter(); // Initialized the router

  const onClickLearnMore = () => {
    router.push(`/stock/${ticker}`);
  };
  return (
    <div className="bg-white rounded-lg p-4 shadow-md w-40">
      <h3 className="text-sm font-semibold mb-2">{name}</h3>
      <h3 className="text-sm font-semibold mb-2">{ticker}</h3>

      <p className="text-xl font-semibold mt-2">${price}</p>
      <div className="flex">
        <p className="text-gray-600">{changePercentage}</p>
        {changePercentage.toString().startsWith("-") ? (
          <LossIcon />
        ) : (
          <ProfitIcon />
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
