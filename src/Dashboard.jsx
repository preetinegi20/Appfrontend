import React, { useContext, useEffect, useState } from "react";
import { ArticleContext } from "./Context/Article";
import { FilterContext } from "./Context/FilterTypes";
import { Bar } from "react-chartjs-2";
import Toggle from "./menu/Toggle";

import { ThemeContext } from "./Context/Theme";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const ArticleContextUse = useContext(ArticleContext);
  const articles = ArticleContextUse.article;

  const { theme, toggleTheme } = useContext(ThemeContext);
  const FilterContextUse = useContext(FilterContext);
  const type = FilterContextUse.type || "All"; // Default to "All" if type is empty

  const [payoutData, setPayoutData] = useState({});
  const [totalArticles, setTotalArticles] = useState(0);

  // Calculate payouts data (assuming rate per article is a constant)
  useEffect(() => {
    const ratePerArticle = 5000;
    const authorPayouts = {};

    articles.forEach((article) => {
      const author = article.author || "Unknown";
      if (!authorPayouts[author]) {
        authorPayouts[author] = 0;
      }
      authorPayouts[author] += ratePerArticle;
    });

    setPayoutData(authorPayouts);
    setTotalArticles(articles.length);
  }, [articles]);

  // Prepare chart data for payouts
  const chartData = {
    labels: Object.keys(payoutData),
    datasets: [
      {
        label: "Payouts (INR)",
        data: Object.values(payoutData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  useEffect(() => {
    // Clean up previous chart if it exists
    const chartInstance = ChartJS.instances[0];
    if (chartInstance) {
      chartInstance.destroy(); // Destroy the previous instance to prevent canvas re-use issues
    }
  }, [payoutData]);

  return (
    <div className="dashboard-container">
      <Toggle></Toggle>
      <h1>Dashboard</h1>
      <div className="cont">
        <div
          className="toggle"
          style={{
            backgroundColor: theme === "light" ? "#4399ff" : "orange",
          }}
        >
          <input
            type="checkbox"
            id="mode-toggle"
            className="toggle__input"
            onClick={toggleTheme}
          />
          <label htmlFor="mode-toggle" className="toggle__label"></label>
        </div>
      </div>
      <div className="overview">
        <h2>Overview</h2>
        <p>Total Articles: {totalArticles}</p>
        <p>Current Filter: {type}</p>
      </div>

      <div className="payout-visualization">
        <h2>Payouts by Author</h2>
        <Bar
          data={chartData}
          style={{
            backgroundColor: theme === "light" ? "black" : "white",
            color: theme === "light" ? "black" : "#fff",
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
