import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LineChart() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [high52Week, setHigh52Week] = useState(null);
  const [low52Week, setLow52Week] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetch52WeekData = async () => {
    try {
      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      const lastYear = new Date();
      lastYear.setDate(today.getDate() - 52 * 7);
      const lastYearString = lastYear.toISOString().split("T")[0];

      const apiUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=${lastYearString}&to=${todayString}&apikey=${apiKey}`;

      const response = await axios.get(apiUrl);

      if (!response || !response.data || !response.data.historical) {
        throw new Error("Data not available.");
      }

      const historical = response.data.historical;
      const HighsNLows = historical.map((item) => (item.high + item.low) / 2);
      const maxHigh = Math.max(...HighsNLows);
      const minLow = Math.min(...HighsNLows);

      setHigh52Week(maxHigh);
      setLow52Week(minLow);
      setData(historical);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch52WeekData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <div className="border-2 p-4 rounded-lg mb-6">
            <p className="font-bold">52 Week High: {high52Week}</p>
            <p className="font-bold">52 Week Low: {low52Week}</p>
          </div>
          <div className="mt-4 relative">
            {/* Thick Line */}
            <div className="w-full h-6 bg-gray-300 rounded-full" />

            {/* 52-Week High Arrow */}
            <div
              className="absolute h-12 w-2 bg-red-500 -ml-1 top-4"
              style={{
                left: `${
                  ((high52Week - Math.min(low52Week, high52Week)) /
                    (Math.max(low52Week, high52Week) -
                      Math.min(low52Week, high52Week))) *
                  100
                }%`,
              }}
            >
              <div className="w-0 h-0 border-4 border-red-500 border-t-transparent border-r-transparent border-b-red-500 border-l-transparent -mt-1" />
            </div>

            {/* 52-Week Low Arrow */}
            <div
              className="absolute h-12 w-2 bg-green-500 -ml-1 top-4"
              style={{
                left: `${
                  ((low52Week - Math.min(low52Week, high52Week)) /
                    (Math.max(low52Week, high52Week) -
                      Math.min(low52Week, high52Week))) *
                  100
                }%`,
              }}
            >
              <div className="w-0 h-0 border-4 border-green-500 border-t-transparent border-r-transparent border-b-green-500 border-l-transparent -mt-1" />
            </div>

            {/* Current Price Arrow */}
            <div
              className="absolute h-12 w-2 bg-blue-500 -ml-1 top-4"
              style={{
                left: `${
                  ((data[data.length - 1].close -
                    Math.min(low52Week, high52Week)) /
                    (Math.max(low52Week, high52Week) -
                      Math.min(low52Week, high52Week))) *
                  100
                }%`,
              }}
            >
              <div className="w-0 h-0 border-4 border-blue-500 border-t-transparent border-r-transparent border-b-blue-500 border-l-transparent -mt-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
