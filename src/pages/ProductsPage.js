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
const handleDownlink = () => {
  console.log(erickValue, byteValue)
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

    <div>
      <TextField value={erickValue} style = {{width: 300}} label="Erick-ID" color="secondary" focused onChange={handleChangeVal}/>
      <TextField value={byteValue} style = {{width: 300}} label="Enter String" color="secondary" focused onChange={handleChangeByte}/>
      <Button variant="contained" onClick={handleDownlink} >Send Downlink</Button>
    
    </div>
     


    </>
  );
}
