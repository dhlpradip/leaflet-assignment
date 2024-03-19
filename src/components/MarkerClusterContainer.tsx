import React, { useMemo, useEffect, useContext } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { LayersControl, useMap } from "react-leaflet";
import "react-leaflet-markercluster/dist/styles.min.css";
import { MarkerContainer } from "./MarkerContainer";
import { LatLngExpression } from "leaflet";
import { MapContext, MapContextType } from "../context/mapContext";
import LassoController from "./LassoController";

export interface MarkerType {
  id: number;
  pos: LatLngExpression;
}

interface MarkerClusterContainerProps {
  width: string;
  height: string;
  onMarkerClick: (id: number, pos: LatLngExpression) => void;
}

const MarkerClusterContainer: React.FC<MarkerClusterContainerProps> = ({
  width,
  height,
  onMarkerClick,
}) => {
  const mapRef = useMap();
  const { markers } = useContext(MapContext) as MapContextType;

  useEffect(() => {
    if (mapRef) {
      mapRef.invalidateSize();
    }
  }, [mapRef, width, height]);

  const markerComponents = useMemo(() => {
    return markers.map((marker: MarkerType) => (
      <MarkerContainer
        position={marker.pos}
        key={marker.id}
        id={marker.id}
        onMarkerClick={onMarkerClick}
      />
    ));
  }, [markers, onMarkerClick]);

  return (
    <>
      <LayersControl.Overlay name="Markers and Marker Clusters" checked>
        <MarkerClusterGroup>{markerComponents}</MarkerClusterGroup>
      </LayersControl.Overlay>
      <LassoController map={useMap()} />
    </>
  );
};

export { MarkerClusterContainer };
