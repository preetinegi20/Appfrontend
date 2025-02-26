import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FilterProvider } from "./Context/FilterContext.jsx";
// import { ThemeProvider } from "./Context/Theme.jsx";
import { ArticleProvider } from "./Context/Article.jsx";
import { ThemeProvider } from "./Context/Theme.jsx";
createRoot(document.getElementById("root")).render(
  <FilterProvider>
    <ThemeProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ThemeProvider>
  </FilterProvider>
);
