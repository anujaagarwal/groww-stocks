import React from "react";
import SearchResult from "../SearchResult";

export default function SearchResultsList({ results }) {
  if (!Array.isArray(results)) {
    return (
      <div className="bg-black text-white">
        <p>Retype the stock symbol.</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-white flex flex-col backdrop-blur-xl rounded mt-4 max-h-64 w-full overflow-y-scroll">
      {results.map((result) => {
        const symbol = result["symbol"];
        const name = result["name"];
        return <SearchResult key={symbol} symbol={symbol} name={name} />;
      })}
    </div>
  );
}
