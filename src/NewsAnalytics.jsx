import React, { useState, useEffect } from "react";
import { useFilter } from "./Context/FilterContext";
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
  const [authorData, setAuthorData] = useState({});
  const [typeData, setTypeData] = useState({});
  const { filters, articles } = useFilter();

  // Process data for article trends by author
  useEffect(() => {
    const authorCounts = {};
    const typeCounts = {};

    // Safety check for articles array
    if (!Array.isArray(articles)) return;

    articles.forEach((article) => {
      // Fixed the counting logic to use actual author and type
      const author = article?.author || "Unknown";
      const type = article?.source?.name || "Unknown";

      // Correctly increment counts
      authorCounts[author] = (authorCounts[author] || 0) + 1;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    setAuthorData(authorCounts);
    setTypeData(typeCounts);
  }, [articles]); // Removed filters from dependencies as it's not used

  // Prepare data for the Bar chart (Articles by Author)
  const authorChartData = {
    labels: Object.keys(authorData),
    datasets: [
      {
        label: "Articles by Author",
        data: Object.values(authorData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
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
        borderColor: Array(Object.keys(typeData).length).fill("white"),
        borderWidth: 1,
      },
    ],
  };

  // Common chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg news-analytics-container">
      <Toggle />
      <h1 className="text-2xl font-bold mb-6">News Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 charts-container">
        <div className="p-4 bg-gray-50 rounded-lg chart-item">
          <h2 className="text-lg font-semibold mb-4">Articles by Author</h2>
          <div className="h-64">
            <Bar
              data={authorChartData}
              options={chartOptions}
              className="bar&pieStyle"
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg chart-item">
          <h2 className="text-lg font-semibold mb-4">
            Articles by Source Type
          </h2>
          <div className="h-64">
            <Pie data={typeChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsAnalytics;
