import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import serialise from '../utils/serialise';
import './Home.css'
import { Link } from 'react-router-dom';
import Layout from './SideBar';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

function Home() {
    const [data, setData] = useState(new Map())
    const [serialisedData, setSerialisedData] = useState([])
    const [drawerOpen, setDrawerOpen] = useState(false)
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
    function handleLogout() {
        localStorage.removeItem('loggedIn')
        window.location = '/login'
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Button onClick={() => {setDrawerOpen(!drawerOpen)}} style={{color: 'white'}}>
                        Menu
                    </Button>
                    <Typography>
                        E-RICK
                    </Typography>
                    <Button onClick={handleLogout} style={{color: 'white'}}>
                        LOGOUT
                    </Button>
                </Toolbar>
            </AppBar>
            <div className="HomeTable">
                <Layout open={drawerOpen} openFunc={setDrawerOpen}/>
                <table style={{width:'80vw'}}>
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
                            <tbody>

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
                            </tbody>
                        )
                    })}
                </table>
            </div >
            

        </>

    );
}

export default Home