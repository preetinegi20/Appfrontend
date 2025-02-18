import React from "react";
import { useFilter } from "../src/Context/FilterContext";

function Filter() {
  const { filters, updateFilter, handleFilterChange } = useFilter();

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
              value={filters.author}
              placeholder="Enter author name"
              onChange={(e) => updateFilter("author", e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={filters.startDate}
              onChange={(e) => updateFilter("startDate", e.target.value)}
              max={filters.endDate || undefined}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={filters.endDate}
              onChange={(e) => updateFilter("endDate", e.target.value)}
              min={filters.startDate || undefined}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="type">Category:</label>
            <select
              value={filters.type}
              id="type"
              onChange={(e) => updateFilter("type", e.target.value)}
            >
              <option value="technology">technology</option>
              <option value="business">business</option>
              <option value="entertainment">entertainment</option>
              <option value="general">general</option>
              <option value="health">health</option>
              <option value="science">science</option>
              <option value="sports">sports</option>
            </select>
          </div>

          <button onClick={handleFilterChange}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
