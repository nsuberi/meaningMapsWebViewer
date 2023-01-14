import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Neo4jProvider, createDriver } from 'use-neo4j';
import './index.css';

const driver = createDriver('bolt', 'localhost', 7687, 'neo4j', null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Neo4jProvider driver={driver}>
      <App />
    </Neo4jProvider>
  </React.StrictMode>
);