import React, { useState } from "react";
import { useContext } from "react";
import { useFilter } from "./Context/FilterContext.jsx";
import { ArticleContext } from "./Context/Article";
// import { handleFilterChange } from "../src/Filter.jsx";
function Search() {
  // const FilterContextUse = useContext(FilterContext);
  // const [type, setType] = useState(FilterContextUse.type);
  const { filters, updateFilter, handleFilterChange } = useFilter();
  // console.log(setFilters);
  return (
    <div className="search-container ">
      <div className="searchInputWrapper">
        <input
          className="searchInput"
          type="text"
          placeholder="focus here to search"
          value={filters.type}
          onChange={(e) => updateFilter("type", e.target.value)}
        />
        <button
          onClick={async () => {
            await handleFilterChange();
          }}
        >
          <img
            src="	https://emojipedia.org/_next/static/media/search-light.f18d5293.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default Search;
