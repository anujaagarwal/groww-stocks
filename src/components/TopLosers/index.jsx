import React, { useEffect, useState } from "react";
import { fetchAndCacheApiData } from "../../utils/apiCache";
import StockCard from "../StockCard";
// handled loading, error and empty states
export default function TopLosers() {
  const [data, setData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);
  const initialCardsToShow = 20;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/stock_market/losers?apikey=${apiKey}`;
      const cacheKey = "topLosersData";
      const expirationTime = 60;
      // Fetch data with caching
      const cachedData = await fetchAndCacheApiData(
        apiUrl,
        cacheKey,
        expirationTime
      );

      setData(cachedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      if (loadMoreClicked) {
        setVisibleData(data.slice(0, visibleData.length + initialCardsToShow));
        setLoadMoreClicked(true);
      } else {
        setVisibleData(data.slice(0, initialCardsToShow));
      }
    }
  }, [data, loadMoreClicked]);

  return (
    <div className="flex flex-wrap -mx-2">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {visibleData.map((stock) => (
        <div
          key={stock.symbol}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
        >
          <StockCard
            name={stock.name}
            ticker={stock.symbol}
            price={stock.price}
            changePercentage={stock.changesPercentage}
          />
        </div>
      ))}
      {!loading && data.length === 0 && <p>No data available</p>}
      {data.length > visibleData.length && !loadMoreClicked && (
        <div className="w-full my-4 flex justify-center">
          <button
            onClick={() => setLoadMoreClicked(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-full text-sm focus:outline-none shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
