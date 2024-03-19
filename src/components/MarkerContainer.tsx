import React, { useContext, useMemo } from "react";
import { LatLngExpression, Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { MapContext, MapContextType } from "../context/mapContext";

interface MarkerContainerProps {
  position: LatLngExpression;
  id: number;
  onMarkerClick: (id: number, pos: LatLngExpression) => void;
}

const MarkerContainer: React.FC<MarkerContainerProps> = ({
  position,
  id,
  onMarkerClick,
}) => {
  const { clickedMarker } = useContext(MapContext) as MapContextType;

  const eventHandlers = useMemo(
    () => ({
      click() {
        onMarkerClick(id, position);
      },
    }),
    [onMarkerClick, id, position]
  );

  const markerIconUrl = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${
    clickedMarker === id ? "red" : "green"
  }.png`;

  const icon = new Icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: markerIconUrl,
    shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png",
  });

  return (
    <Marker position={position} eventHandlers={eventHandlers} icon={icon}>
      {clickedMarker === id && (
        <Popup className="bg-gray">Selected Marker</Popup>
      )}
    </Marker>
  );
};

export { MarkerContainer };
