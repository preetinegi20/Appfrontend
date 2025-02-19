import React, { useState, useEffect, useContext } from "react";
import Search from "./Search";
import Filter from "./Filter.jsx";
import { FilterContext } from "./Context/FilterTypes";
import { ArticleContext } from "./Context/Article.jsx";
import { useFilter } from "../src/Context/FilterContext.jsx";
import Toggle from "./menu/Toggle.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Logout from "./Logout.jsx";
function Home() {
  const navigate = useNavigate(); // Hook for navigation
  // const apiKey = "abe6c5969df346498bf6c8be5756cac6";
  // const newsAPIUrl = "https://newsapi.org/v2/everything?q=";
  // const ArticleContextUse = useContext(ArticleContext);
  const { error, articles, handleFilterChange } = useFilter();
  useEffect(() => {
    handleFilterChange();
  }, []); // Initial load
  const navigateToDashboard = () => {
    navigate("/dashboard"); // Redirect to the Dashboard page
  };
  // console.log(`http://localhost:5000/news?category=sports`);
  return (
    <div>
      <div className="navigations">
        <Toggle />
        <Search />
        <Logout />
      </div>

      <Filter />

      <div className="news-container">
        <h1>Top News Articles</h1>
        <button
          onClick={navigateToDashboard}
          style={{
            width: "9rem",
            padding: ".7rem",
            margin: "auto",
            backgroundColor: "#0783a39c",
            color: "white",
          }}
        >
          Go to Dashboard
        </button>{" "}
        {/* Button to navigate to Dashboard */}
        {error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : Array.isArray(articles) && articles.length > 0 ? (
          <div className="container">
            <h2 className="articleCount">Article Count: {articles.length}</h2>
            {articles.map((article, index) => (
              <div key={index} className="article">
                <img src={article.urlToImage} alt="" />
                <h3>{article.title}</h3>
                <div className="items">
                  <p>By {article.author ? article.author : "Unknown"}</p>
                  <p>
                    • Date: {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                </div>
                <p>Source: {article.source.name}</p>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
