import './App.css';
import MapContainer from './Components/MapContainer';
import io from 'socket.io-client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import Home from './Components/Home'
import Trajectory from './Components/Trajectory';
import Login from './Components/Login';

const socket = io();

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [loggedIn, setLoggedIn] = useState('true');

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

  useEffect(() => {
    console.log(window.location.pathname, loggedIn !== 'true')
    if (window.location.pathname !== '/login' && loggedIn !== 'true') {
      window.location = '/login'
    }
  }, [loggedIn])

  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn'))
  }, [localStorage])

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
            <Trajectory />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
