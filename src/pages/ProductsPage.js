import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import axios from 'axios'
import { TextField , Button } from '@mui/material';
// components

// mock


// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [erickValue, setErickValue] = useState("")

  const [byteValue, setByteValue] = useState("")

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  function encodeDownlink(input) {
    // input has the following structure:
    // {
    //   field: "value"
    // }
    return {
      bytes: [1, 2, 3], // FRMPayload (byte array)
      fPort: 1,
      warnings: ["warning 1", "warning 2"], // optional
      errors: ["error 1", "error 2"] // optional (if set, the encoding failed)
    }
  }
const handleDownlink = () => {
  console.log(erickValue, byteValue)
  console.log({byteValue})
  console.log(encodeDownlink({"byteValue":byteValue}))
  console.log({byteValue})
  axios({
    method: "post",
    url: "/downlink/",
    data: {"erick_id":erickValue, "data":byteValue}
  }).then(console.log("Data sent"))
}

const handleChangeVal = e => {
  setErickValue(e.target.value)
}

const handleChangeByte = e => {
  setByteValue(e.target.value)
}
  return (
    <>
      <Helmet>
        <title> E-Rick Tracking System </title>
      </Helmet>

      <div className="d-flex flex-column mb-3">
        <div className="p-2" style={{padding :"10px"}}><TextField value={erickValue} style = {{width: 300}} label="Erick-ID" color="secondary" focused onChange={handleChangeVal}/></div>
        <div className="p-2" style={{padding :"10px"}}>
      <TextField value={byteValue} style = {{width: 300}} label="Enter String" color="secondary" focused onChange={handleChangeByte}/></div>
        <div className="p-2" style={{padding :"10px"}}>
      <Button variant="contained" onClick={handleDownlink} >Send Downlink</Button></div>
      </div>

    </>
  );
}
