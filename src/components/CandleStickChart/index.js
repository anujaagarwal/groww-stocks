import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import "highcharts/css/highcharts.css";

const CandlestickChart = (props) => {
  const [stockData, setStockData] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/historical-price-full/${props.id}?apikey=${apiKey}`
      )
      .then((response) => {
        const formattedData = response.data.historical.map((item) => ({
          x: new Date(item.date).getTime(),
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));
        setStockData(formattedData);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [props.id]);

  const chartOptions = {
    title: {
      text: "Candlestick Chart",
    },
    xAxis: {
      type: "datetime",
    },
    series: [
      {
        type: "candlestick",
        data: stockData.slice(0, 100),
      },
    ],

    rangeSelector: {
      selected: 1,
      buttons: [
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
        },
        {
          type: "all",
          text: "All",
        },
      ],
    },
  };

  return (
    <div id="candlestick-container" style={{ width: "100%", height: "400px" }}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
    </div>
  );
};

export default CandlestickChart;
