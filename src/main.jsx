import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./components/Context/Context.jsx";
import { reducer, initial } from "./Utility/Reducer.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider reducer={reducer} initial={initial}>
      <App />
    </DataProvider>
  </StrictMode>
);
