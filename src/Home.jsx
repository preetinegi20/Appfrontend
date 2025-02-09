import React, { useState, useEffect, useContext } from "react";
import Search from "./Search";
import Filter from "./Filter.jsx";
import { FilterContext } from "./Context/FilterTypes";
import { ArticleContext } from "./Context/Article.jsx";
import Toggle from "./menu/Toggle.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Logout from "./Logout.jsx";

function Home() {
  const navigate = useNavigate(); // Hook for navigation
  const [error, setError] = useState(null);
  const FilterContextUse = useContext(FilterContext);
  const type = FilterContextUse.type || "All"; // Default to "All" if type is empty
  const apiKey = "abe6c5969df346498bf6c8be5756cac6";
  const newsAPIUrl = "https://newsapi.org/v2/everything?q=";
  const ArticleContextUse = useContext(ArticleContext);
  const articles = ArticleContextUse.article;
  const setArticles = ArticleContextUse.setArticle;

  useEffect(() => {
    fetch(`${newsAPIUrl}${type}&apiKey=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [type]);

  const navigateToDashboard = () => {
    navigate("/dashboard"); // Redirect to the Dashboard page
  };

  return (
    <div>
      <Toggle></Toggle>
      <div className="navigations">
        <Search />
        <Logout />
        <Filter pass={FilterContextUse.setType} />
      </div>

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
