import './App.css';
import MapContainer from './Components/MapContainer';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

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
    <MapContainer socket={socket}></MapContainer>
  );
}

export default App;
