
import axios from "axios";
import { useState , useEffect} from 'react';
import serialise from "../utils/serialise";
/* eslint-disable */
function User(){
  const [data, setData] = useState(new Map())

  const [serialisedData, setSerialisedData] = useState([])
   
  useEffect(() => {
   axios.get(`/get_erick_data/`).then((response) => {
       response.data.map((element) => {
           setData(
               (map) => new Map(map.set(element._id, element.data))
           );
       });
  });
 }, []);
 useEffect(() => {
   setSerialisedData(serialise(data))
 }, [data])
 
 console.log({serialisedData})
 return serialisedData

}

export default User;
