import React, { useContext } from "react";
import Leaflet, { LatLngExpression } from "leaflet";
import {
  LayersControl,
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
// import { MapRef } from "./MapRef";
import "leaflet/dist/leaflet.css";
import { MarkerClusterContainer } from "./MarkerClusterContainer";
import { MapContext, MapContextType } from "../context/mapContext";

interface MapClickHandlerProps {
  addMarker: (event: L.LeafletMouseEvent) => void;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ addMarker }) => {
  useMapEvents({
    click: addMarker,
  });
  return null;
};

Leaflet.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/";

interface MapComponentProps {
  onMarkerClick: (id: number, pos: LatLngExpression) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onMarkerClick }) => {
  const { markers, setMarkers } = useContext(MapContext) as MapContextType;

  const addMarker = (event: L.LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setMarkers([...markers, { id: markers.length + 2, pos: [lat, lng] }]);
  };

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={5}
        style={{ height: "100vh", width: "100%" }}
      >
        <LayersControl>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler addMarker={addMarker} />
          <MarkerClusterContainer
            width="100%"
            height="100%"
            onMarkerClick={onMarkerClick}
          />
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
