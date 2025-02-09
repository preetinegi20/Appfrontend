import React from "react";
import { useState, useContext } from "react";
// import { useContext } from "react";
import { FilterContext } from "./Context/FilterTypes";
import { ArticleContext } from "./Context/Article";
function Filter(props) {
  const [author, setAuthor] = useState("");
  const [startDate, setStartDate] = useState("");
  const ArticleContextUse = useContext(ArticleContext);
  const FilterContextUse = useContext(FilterContext);
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const handleFilterChange = () => {
    const newarticle = ArticleContextUse.article.filter((item) => {
      const isAuthermatch = author
        ? item.author?.toLowerCase().includes(author.toLowerCase())
        : true; //if author is truthy then item.author will be check if it is truthy then it will be converted into lowercase and futher checks if it includes the author or not
      const isStartDatematch = startDate
        ? new Date(item.publishedAt) >= new Date(startDate)
        : true;
      const isEndDatematch = endDate
        ? new Date(item.publishedAt) <= new Date(endDate)
        : true;
      const isTypematch = type ? type === FilterContextUse.type : true;

      FilterContextUse.setType(type);
      return isAuthermatch && isTypematch && isEndDatematch && isStartDatematch;
    });
    ArticleContextUse.setArticle(newarticle);
  };
  return (
    <div>
      <div className="filters-container">
        <h3>Filter News</h3>

        <div className="container">
          <div className="filter-group">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              value={author}
              placeholder="Enter author name"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="type">Type:</label>
            <select
              value={type}
              id="type"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All</option>
              <option value="news">News</option>
              <option value="blogs">Blogs</option>
              <option value="cricket">Cricket</option>
            </select>
          </div>

          <button onClick={handleFilterChange}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
