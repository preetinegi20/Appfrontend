import { createContext, useState } from "react";
export const FilterContext = createContext();
export const FilterProvider = (props) => {
  const [type, setType] = useState("technology");
  return (
    <FilterContext.Provider value={{ type, setType }}>
      {props.children}
    </FilterContext.Provider>
  );
};
