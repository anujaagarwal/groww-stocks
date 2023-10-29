import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import TopGainers from "@/components/TopGainers";
import TopLosers from "@/components/TopLosers";
import { useState } from "react";
require("dotenv").config();

export default function Home() {
  const [activeTab, setActiveTab] = useState("topGainers"); // Initialized with the default tab

  // Callback function to update the active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex-grow">
        <div className="mx-auto w-screen">
          <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
          {activeTab === "topGainers" ? <TopGainers /> : <TopLosers />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
