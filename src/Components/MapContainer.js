import axios from "axios";
import { Map as Gmap, Marker, GoogleApiWrapper } from "google-maps-react";
import { useEffect, useState } from "react";

function MapContainer(props) {
  const [locations, setLocations] = useState(new Map());
  useEffect(() => {
    props.socket.on("update", (location) => {
      setLocations(map => new Map(locations.set(location.erick_id,location)));
      // console.log(locations);
    });
    props.socket.on("test", (location) => {
      // console.log("got it");
    });
  }, []);
  useEffect( () => {
    axios.get(`/get_erick_data/`).then((response) => {
      response.data.map(element => {
        setLocations(map => new Map(locations.set(element._id,element.data)));
      });
      console.log(locations);
    });
  },[]);
  return (
    <Gmap
      google={props.google}
      zoom={16}
      initialCenter={{
        lat: 29.867503,
        lng: 77.895636,
      }}
    >
      {
        Array.from(locations.values()).map(element => {
          var loc = {
            lat:parseFloat(element.lat),
            lng:parseFloat(element.lng)
          };
          return <Marker title={""} name={""} position={loc} />;
        })
      }
    </Gmap>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBB5VtbYNkoqHZD9uPohGNszVQnSsCo5ko",
})(MapContainer);
