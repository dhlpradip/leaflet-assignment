import "leaflet/dist/leaflet.css";
import Map from "./components/Map";
import { useContext } from "react";
import { MapContext, MapContextType } from "./context/mapContext";

const App: React.FC = () => {
  const { handleMarkerClick } = useContext(MapContext) as MapContextType;
  return (
    <div className="grid grid-cols-4 gap-2 p-5">
      <div className="col-span-4">
        <div className="mx-5">
          <p>Click on the map to add markers</p>
        </div>
        <Map onMarkerClick={handleMarkerClick} />
      </div>
    </div>
  );
};

export default App;
