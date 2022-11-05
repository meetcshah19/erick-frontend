import './App.css';
import MapContainer from './Components/MapContainer';
import io from 'socket.io-client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useEffect, useState } from 'react';
import Home from './Components/Home'
import Trajectory from './Components/Trajectory';

const socket = io();

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log("connect");
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log("dconnect");
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
      console.log("pong");
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/map">
            <MapContainer socket={socket}></MapContainer>
          </Route>
          <Route path="/trajectory">
          <Trajectory/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
