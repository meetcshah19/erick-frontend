import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { useEffect, useState } from "react";

function MapContainer(props) {
  const [locations, setLocations] = useState(new Map());

  useEffect(() => {
    props.socket.on("update", (location) => {
      console.log(location);
      locations.set(location.erick_id,{location})
      setLocations(locations);
    });
  }, []);

  return (
    <Map
      google={props.google}
      zoom={16}
      initialCenter={{
        lat: 29.867503,
        lng: 77.895636,
      }}
    >
      {locations.values().map((element) => {
        return <Marker title={"Erick-Id"} name={""} position={element} />;
      })}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
})(MapContainer);
