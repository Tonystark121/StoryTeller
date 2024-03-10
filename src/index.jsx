import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StoryContextProvider } from "./context/firebase";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoryContextProvider>
    <App />
  </StoryContextProvider>
);
