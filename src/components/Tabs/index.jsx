function Tabs({ activeTab, onTabChange }) {
  return (
    <div>
      <div className="flex space-x-4 m-2">
        <button
          className={`px-4 py-2 ${
            activeTab === "topGainers"
              ? "bg-green-500 text-white font-bold"
              : "bg-gray-300"
          } rounded-lg focus:outline-none`}
          onClick={() => onTabChange("topGainers")}
        >
          Top Gainers
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "topLosers"
              ? "bg-red-500 text-white font-bold"
              : "bg-gray-300"
          } rounded-lg focus:outline-none`}
          onClick={() => onTabChange("topLosers")}
        >
          Top Losers
        </button>
      </div>
    </div>
  );
}

export default Tabs;
