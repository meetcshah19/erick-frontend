import axios from "axios";
import { Map as Gmap, Marker, GoogleApiWrapper , InfoWindow} from "google-maps-react-17";
import { useEffect, useState } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { styled } from "@mui/material/styles";
import { InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";


function MapContainer(props) {
  const [locations, setLocations] = useState(new Map());
  const [filterLocations, setFilterLocations] = useState([]);
  const [live, setLive] = React.useState(true);
  const [idSet, setIdSet] = React.useState(false);
  const [erick_id, setErick_id] = React.useState("");
  const [start_date, setStart_date] = React.useState(null);
  const [end_date, setEnd_date] = React.useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);


  useEffect(()=>{
    console.log({selectedElement})
  },[selectedElement])


  const handleChange = (event) => {
    setLive(event.target.checked);
    console.log("live: " + locations.values());
  };

  const handleErickIdChange = (event) => {
    setErick_id(event.target.value);
    console.log("erick_id: " + event.target.value);
    setIdSet(true);
  };
  useEffect(() => {
    onFilterChange(null);
  }, [erick_id, start_date, end_date]);
  const onFilterChange = (event) => {
    console.log("filter change");
    console.log(
      "erick_id: " +
        erick_id +
        " start_date: " +
        start_date +
        " end_date: " +
        end_date
    );
    if (erick_id.length > 0 && start_date && end_date) {
      axios
        .get(
          `/get_erick_data?erick_id=${erick_id}&start_date=${start_date}&end_date=${end_date}`
        )
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
    }
    else {
      setFilterLocations([]);
    }
  };
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  useEffect(() => {
    props.socket.on("update", (location) => {
      setLocations(
        (map) => new Map(locations.set(location.erick_id, location))
      );
    });
  }, []);
  useEffect(() => {
    axios.get(`/get_erick_data/`).then((response) => {
      response.data.map((element) => {
        setLocations(
          (map) => new Map(locations.set(element._id, element.data))
        );
      });
    });
  }, []);
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <FormGroup>
              <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={live}
                    onChange={handleChange}
                    aria-label="login switch"
                    color="warning"
                  />
                }
                label={"Live"}
              />
            </FormGroup>
            {!live ? (
              <>
                <InputLabel
                  style={{
                    color: "white",
                    paddingLeft: "20px",
                    paddingRight: "20px",
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
                    color: "white",
                    paddingLeft: "20px",
                    inputLabelRoot: {
                      color: "red",
                    },
                  }}
                >
                  {Array.from(locations.keys()).map((element) => {
                    return (
                      <MenuItem
                        style={{ paddingRight: "20px" }}
                        value={element}
                      >
                        {element}
                      </MenuItem>
                    );
                  })}
                </Select>
                {idSet ? (
                  <>
                    <InputLabel
                      style={{
                        color: "white",
                        paddingLeft: "20px",
                        paddingRight: "20px",
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
                        color: "white",
                        paddingLeft: "20px",
                        paddingRight: "20px",
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
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Gmap
        google={props.google}
        zoom={16}
        initialCenter={{
          lat: 29.867503,
          lng: 77.895636,
        }}
      >
        
        {live
          ? Array.from(locations.values()).map((element) => {
            console.log("fetched from socket",element)
              var loc = {
                lat: parseFloat(element.lat),
                lng: parseFloat(element.lng),
              };
              return (<Marker title={""} name={""} position={loc} onClick={(_,marker) => {
                console.log("Click")
                setSelectedElement(element);
                setActiveMarker(marker);
              }}
/>);
            })
          : Array.from(filterLocations.values()).map((element) => {
            console.log(element)
              var loc = {
                lat: parseFloat(element.latitude),
                lng: parseFloat(element.longitude),
              };
              return <Marker title={""} name={""} position={loc} onClick={(_, marker) => {
                
                setSelectedElement(element);
                setActiveMarker(marker);
              }}/>;
            })}
            {selectedElement && (
              <InfoWindow
              visible={showInfoWindow}
              marker={activeMarker}
              onCloseClick={() => {
                setSelectedElement(null);
              }}
              >
            <div>
            {console.log(showInfoWindow, activeMarker)}
              <h1>{selectedElement?.latitude ? selectedElement.longitude : selectedElement.lng}</h1>
            </div>
          </InfoWindow> 
        )}
      </Gmap>

    </>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBB5VtbYNkoqHZD9uPohGNszVQnSsCo5ko",
})(MapContainer);
