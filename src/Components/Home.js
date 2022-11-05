import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import serialise from '../utils/serialise';
import './Home.css'
import { Link } from 'react-router-dom';

function Home() {
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

    return (
        <div className="HomeTable">
            <table>
                <tbody>
                    <tr>
                        <th>Erick-ID</th>
                        <th>Driver's Name</th>
                        <th>Driver's Contact</th>
                        <th>Latitude</th>
                        <th>Longitude</th>

                    </tr>
                </tbody>
                {serialisedData.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.id}</td>
                            <td>{val.driver_name}</td>
                            <td>{val.driver_contact}</td>
                            <td>{val.lat}</td>
                            <td>{val.lng}</td>
                            <td> <Link
                                to={{
                                    pathname: "/map",
                                    search: `?params_erick_id=${val.id}`,
                                }}
                            > Go to Map</Link></td>
                        </tr>
            )
                })}
        </table>
        </div >
    );
}

export default Home