import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { MapProvider } from "./context/mapContext.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from "./components/Test.tsx";

ReactDOM.render(
  <React.StrictMode>
    <MapProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </MapProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
