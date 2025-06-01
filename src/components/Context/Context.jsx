// import { createContext, useReducer } from "react";

// const DataContext = createContext();
// function DataProvider({ children, reducer, initial }) {
//   return (
//     <DataContext.Provider value={useReducer(reducer, initial)}>
//       {children}
//     </DataContext.Provider>
//   );
// }

// export { DataContext, DataProvider };
import { createContext, useReducer } from "react";

export const DataContext = createContext();

export function DataProvider({ children, reducer, initial }) {
  return (
    <DataContext.Provider value={useReducer(reducer, initial)}>
      {children}
    </DataContext.Provider>
  );
}

// export { DataProvider };
