import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Reset the URL to Login whenever the UI starts
window.history.replaceState(null, "", "/");

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);