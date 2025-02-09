import React, { useState, useEffect, useContext } from "react";
import { ArticleContext } from "./Context/Article";
import { Bar, Pie } from "react-chartjs-2";
import Toggle from "./menu/Toggle";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function NewsAnalytics() {
  const ArticleContextUse = useContext(ArticleContext);
  const articles = ArticleContextUse.article;

  const [authorData, setAuthorData] = useState([]);
  const [typeData, setTypeData] = useState([]);

  // Process data for article trends by author
  useEffect(() => {
    const authorCounts = {};
    const typeCounts = {};

    articles.forEach((article) => {
      const author = article.author || "Unknown";
      const type = article.source.name || "Unknown";

      authorCounts[author] = (authorCounts[author] || 0) + 1;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    setAuthorData(authorCounts);
    setTypeData(typeCounts);
  }, [articles]);

  // Prepare data for the Bar chart (Articles by Author)
  const authorChartData = {
    labels: Object.keys(authorData),
    datasets: [
      {
        label: "Articles by Author",
        data: Object.values(authorData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Prepare data for the Pie chart (Articles by Type/Source)
  const typeChartData = {
    labels: Object.keys(typeData),
    datasets: [
      {
        label: "Articles by Type/Source",
        data: Object.values(typeData),
        backgroundColor: [
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#F2F1F1",
          "#FF5733",
        ],
      },
    ],
  };

  return (
    <div className="news-analytics-container">
      <Toggle></Toggle>
      <h1>News Analytics</h1>

      <div className="charts-container">
        <div className="chart-item">
          <h2>Articles by Source Type (Pie Chart)</h2>
          <Pie data={typeChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}

export default NewsAnalytics;
