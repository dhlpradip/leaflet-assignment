import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { MapProvider } from "./context/mapContext.tsx";

ReactDOM.render(
  <React.StrictMode>
    <MapProvider>
      <App />
    </MapProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
