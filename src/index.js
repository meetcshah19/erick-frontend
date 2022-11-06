import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ProSidebarProvider } from 'react-pro-sidebar';

ReactDOM.render(<ProSidebarProvider><App /></ProSidebarProvider>, document.getElementById('root'));