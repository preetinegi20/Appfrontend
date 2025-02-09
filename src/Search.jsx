import React from "react";
import { useContext } from "react";
import { FilterContext } from "./Context/FilterTypes";
function Search() {
  const FilterContextUse = useContext(FilterContext);

  // console.log(FilterContextUse.type);
  return (
    <div>
      <div className="search-container ">
        <div className="searchInputWrapper">
          <input
            className="searchInput"
            type="text"
            placeholder="focus here to search"
            value={FilterContextUse.type}
            onChange={(e) => FilterContextUse.setType(e.target.value)}
          />
          <img
            src="	https://emojipedia.org/_next/static/media/search-light.f18d5293.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
