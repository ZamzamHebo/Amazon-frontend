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
import { reducer, initial } from "../../Utility/Reducer"; // adjust path as needed

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
}

// export { DataProvider };
