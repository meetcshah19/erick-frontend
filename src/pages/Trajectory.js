import axios from 'axios';
import { Map as Gmap, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { useEffect, useState } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, InputLabel, Link, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { TripsLayer, ArcLayer, GeoJsonLayer } from 'deck.gl';
import { GoogleMap } from '@react-google-maps/api';

let LOOP_LENGTH = 1800;
const VENDOR_COLORS = [
  [255, 0, 0], // vendor #0
  [0, 0, 255], // vendor #1
];

let currentTime = 0;
let propsGlobal = {
  id: 'trips',
  data: [],
  getPath: (d) => d.path,
  getTimestamps: (d) => d.timestamps,
  getColor: (d) => VENDOR_COLORS[d.vendor],
  opacity: 1,
  widthMinPixels: 5,
  trailLength: 150,
  currentTime,
  shadowEnabled: false,
};

const overlay = new GoogleMapsOverlay({});
let animating = false;
const animate = () => {
  currentTime = (currentTime + 1) % LOOP_LENGTH;
  const tripsLayer = new TripsLayer({
    ...propsGlobal,
    currentTime,
  });
  // console.log({tripsLayer})
  overlay.setProps({
    layers: [tripsLayer],
  });
  if(animating) {
    window.requestAnimationFrame(animate);
  }
};

window.requestAnimationFrame(animate);

function Trajectory(props, trajectoryStatus) {
  const [locations, setLocations] = useState(new Map());
  const [filterLocations, setFilterLocations] = useState([]);
  const [showLocations, setShowLocations] = useState([]);
  const [live, setLive] = React.useState(true);
  const [idSet, setIdSet] = React.useState(false);
  const [erick_id, setErick_id] = React.useState('');
  const [start_date, setStart_date] = React.useState(null);
  const [end_date, setEnd_date] = React.useState(null);

  const handleErickIdChange = (event) => {
    setErick_id(event.target.value);
    console.log('erick_id: ' + event.target.value);
    setIdSet(true);
  };

  useEffect(() => {
    onFilterChange(null);
  }, [erick_id, start_date, end_date]);

  const startAnimation = (locations) => {
    animating = false;
    overlay.setProps({layers: [],});
    if (locations.length > 1) {
      let path = [];
      let timestamps = [];
      let last_lat = locations[0].lng;
      let last_lng = locations[0].lat;
      let offset = new Date(locations[0].received_at).getTime();
      for (let location of locations) {
        if (last_lat != location.lat || last_lng != location.lng) {
          path.push([parseFloat(location.lng), parseFloat(location.lat)]);
          timestamps.push(Math.round((new Date(location.received_at).getTime() - offset) / 10000));
        }
        last_lng = location.lng;
        last_lat = location.lat;
      }
      let data = [{ vendor: 0, path: path, timestamps: timestamps }];
      console.log(JSON.stringify(data));
      propsGlobal.data = data;
      currentTime = 0;
      LOOP_LENGTH = timestamps[timestamps.length - 1];
      animating = true;
      window.requestAnimationFrame(animate);
    }
  };
  useEffect(() => {
    startAnimation(filterLocations);
  }, [filterLocations]);

  const onFilterChange = (event) => {
    setShowLocations([]);
    console.log('filter change');
    console.log('erick_id: ' + erick_id + ' start_date: ' + start_date + ' end_date: ' + end_date);
    if (erick_id.length > 0 && start_date && end_date) {
      axios
        .get(`/get_erick_data?erick_id=${erick_id}&start_date=${start_date}&end_date=${end_date}`)
        .then((response) => {
          setFilterLocations(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (erick_id.length > 0 && start_date == null && end_date == null) {
      axios
        .get(`/get_erick_data?erick_id=${erick_id}`)
        .then((response) => {
          setFilterLocations(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (erick_id.length > 0 && start_date && end_date == null) {
      axios
        .get(`/get_erick_data?erick_id=${erick_id}&start_date=${start_date}`)
        .then((response) => {
          setFilterLocations(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (erick_id.length > 0 && start_date == null && end_date) {
      axios
        .get(`/get_erick_data?erick_id=${erick_id}&end_date=${end_date}`)
        .then((response) => {
          setFilterLocations(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setFilterLocations([]);
    }
  };

  useEffect(() => {
    props.socket.on('update', (location) => {
      setLocations((map) => new Map(locations.set(location.erick_id, location)));
    });
  }, []);
  useEffect(() => {
    axios.get(`/get_erick_data/`).then((response) => {
      response.data.map((element) => {
        setLocations((map) => new Map(locations.set(element._id, element.data)));
      });
    });
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <>
              <InputLabel
                style={{
                  color: 'white',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                }}
                id="demo-simple-select-label"
              >
                E-Rick Id :
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select"
                value={erick_id}
                label="Erick Id"
                onChange={handleErickIdChange}
                style={{
                  color: 'white',
                  paddingLeft: '20px',
                  inputLabelRoot: {
                    color: 'red',
                  },
                }}
              >
                {Array.from(locations.keys()).map((element) => {
                  return (
                    <MenuItem style={{ paddingRight: '20px' }} value={element}>
                      {element}
                    </MenuItem>
                  );
                })}
              </Select>
              {idSet ? (
                <>
                  <InputLabel
                    style={{
                      color: 'white',
                      paddingLeft: '20px',
                      paddingRight: '20px',
                    }}
                    id="demo-simple-select-label"
                  >
                    Start Time :
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={start_date}
                      onChange={(newValue) => {
                        setStart_date(newValue);
                        onFilterChange(null);
                      }}
                    />
                  </LocalizationProvider>
                  <InputLabel
                    style={{
                      color: 'white',
                      paddingLeft: '20px',
                      paddingRight: '20px',
                    }}
                    id="demo-simple-select-label"
                  >
                    End Time :
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={end_date}
                      onChange={(newValue) => {
                        setEnd_date(newValue);
                        onFilterChange(null);
                      }}
                    />
                  </LocalizationProvider>
                </>
              ) : null}
            </>
          </Toolbar>
        </AppBar>
      </Box>

      <GoogleMap
        onLoad={(map) => {
          overlay.setMap(map);
        }}
        id="deckgl-example"
        mapContainerStyle={{
          height: '75vh',
          width: '80vw'
        }}
        zoom={16}
        center={{
          lat: 29.8675,
          lng: 77.89563,
        }}
      />
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBB5VtbYNkoqHZD9uPohGNszVQnSsCo5ko',
})(Trajectory);
