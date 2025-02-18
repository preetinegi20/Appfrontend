import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState();
  const [filters, setFilters] = useState({
    type: "technology",
    author: "",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = async () => {
    const queryParams = new URLSearchParams();

    if (filters.type) queryParams.append("category", filters.type);
    if (filters.author) queryParams.append("author", filters.author);

    if (filters.startDate) {
      const start = new Date(filters.startDate);
      start.setUTCHours(0, 0, 0, 0);
      queryParams.append("startDate", start.toISOString());
    }

    if (filters.endDate) {
      const end = new Date(filters.endDate);
      end.setUTCHours(23, 59, 59, 999);
      queryParams.append("endDate", end.toISOString());
    }

    try {
      const response = await fetch(
        `http://localhost:3000/news?${queryParams.toString()}`
      );
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      setError(error);
      console.error("Error fetching filtered news:", error);
    }
  };

  const updateFilter = (filterName, value) => {
    console.log("filterName: ", filterName, "value: ", value);
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <FilterContext.Provider
      value={{
        error,
        filters,
        setFilters,
        updateFilter,
        handleFilterChange,
        articles,
        setArticles,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
