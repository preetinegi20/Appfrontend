import React, { useContext, useEffect, useState } from "react";
import { useFilter } from "../src/Context/FilterContext";
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

function Dashboard() {
  const { filters, articles } = useFilter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { theme, toggleTheme } = useContext(ThemeContext);
  const type = filters.type || "All";
  const [payoutData, setPayoutData] = useState({});
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    try {
      setIsLoading(true);
      if (!articles) {
        throw new Error("No articles data available");
      }

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
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Dashboard Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [articles]);

  if (isLoading) {
    return <div>Loading dashboard data...</div>;
  }

  if (error) {
    return <div>Error loading dashboard: {error}</div>;
  }

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

  return (
    <div className="dashboard-container">
      <Toggle />
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

      <div className="payout">
        <h2>Payouts by Author</h2>
        <div className="payout-visualization">
          <Bar
            data={chartData}
            style={{
              backgroundColor: theme === "light" ? "black" : "white",
              color: theme === "light" ? "black" : "#fff",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
