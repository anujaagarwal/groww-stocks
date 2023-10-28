import React, { useEffect, useState } from "react";
import { fetchAndCacheApiData } from "@/utils/apiCache";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StockDescription from "@/components/StockDescription";
import CandlestickChart from "@/components/CandleStickChart";
import LineChart from "@/components/LineChart";

export default function StockInfo() {
  const router = useRouter();
  const { id } = router.query;
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/profile/${id}?apikey=${apiKey}`;
        const cacheKey = `stockInfoCache_${id}`;
        // Fetch data with caching
        const cachedData = await fetchAndCacheApiData(apiUrl, cacheKey, 60);

        setStockData(cachedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData(id);
    }
  }, [id]);

  const hasData = !loading && !error && stockData;

  return (
    <div>
      <Navbar />
      {loading && (
        <div className="loader">
          <p>Loading ...</p>
        </div>
      )}
      {error && (
        <div className="error-message">
          An error occurred. Please try again later.
        </div>
      )}
      {hasData && (
        <>
          <Header
            symbol={stockData[0].symbol}
            image={stockData[0].image}
            exchangeShortName={stockData[0].exchangeShortName}
            changes={stockData[0].changes}
            price={stockData[0].price}
            companyName={stockData[0].companyName}
          />
          <CandlestickChart id={id} />
          <StockDescription
            symbol={stockData[0].symbol}
            companyName={stockData[0].companyName}
            sector={stockData[0].sector}
            industry={stockData[0].industry}
            description={stockData[0].description}
          />
          <LineChart />
        </>
      )}
      <Footer />
    </div>
  );
}
