/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState } from "react";
import { MarkerType } from "../components/MarkerClusterContainer";
import { LassoType } from "../components/LassoController";
import { LatLngExpression } from "leaflet";

export type MapContextType = {
  markers: MarkerType[];
  setMarkers: (values: MarkerType[]) => void;
  lassoCoordinates: LassoType[];
  setLassoCoordinates: (values: LassoType[]) => void;
  handleMarkerClick: (id: number, pos: LatLngExpression) => void;
  clickedMarker: number;
};

const MapContext = createContext<MapContextType | null>(null);

const MapProvider: React.FC = ({ children }) => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [lassoCoordinates, setLassoCoordinates] = useState<LassoType[]>([]);
  const [clickedMarker, setClickedMarker] = useState<number>(0);

  const handleMarkerClick = (id: number) => {
    setClickedMarker(id);
  };

  return (
    <MapContext.Provider
      value={{
        markers,
        setMarkers,
        lassoCoordinates,
        setLassoCoordinates,
        handleMarkerClick,
        clickedMarker,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProvider };
