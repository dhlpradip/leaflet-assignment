/* eslint-disable @typescript-eslint/no-explicit-any */
// LassoController.tsx
import React, { useContext, useEffect, useRef } from "react";
// import "leaflet-lasso/dist/leaflet-lasso.css";
import L, { LatLngExpression } from "leaflet";
import "leaflet-lasso";
import { LayerGroup, LayersControl, Polyline } from "react-leaflet";
import { MapContext, MapContextType } from "../context/mapContext";

export interface LassoType {
  id: number;
  coords: LatLngExpression[];
}

interface LassoControllerProps {
  map: L.Map;
}

const LassoController: React.FC<LassoControllerProps> = ({ map }) => {
  const { lassoCoordinates, setLassoCoordinates } = useContext(
    MapContext
  ) as MapContextType;

  const lassoRef = useRef<L.Control.Lasso | null>(null);

  console.log({ lassoCoordinates });

  useEffect(() => {
    lassoRef.current = L.control.lasso({}).addTo(map);
    map.on("lasso.finished", (event: object) => {
      setLassoCoordinates((lassoCoordinates: string | any[]) => [
        ...lassoCoordinates,
        { id: lassoCoordinates.length + 1, coords: [event.latLngs] },
      ]);
    });

    return () => {
      if (lassoRef.current) {
        lassoRef.current.remove();
      }
    };
  }, [map, setLassoCoordinates]);

  return (
    <>
      <LayersControl.Overlay name="Lasso Selected" checked>
        <LayerGroup>
          {lassoCoordinates.length > 0 &&
            lassoCoordinates.map((lasso) => (
              <Polyline
                key={lasso.id}
                positions={lasso.coords}
                color="red"
                fillColor="blue"
                fillOpacity={100}
              />
            ))}
        </LayerGroup>
      </LayersControl.Overlay>
    </>
  );
};

export default LassoController;
