import React from 'react';
import ReactDOM from 'react-dom/client';
import SimpleApp from './components/simple_ex/Simple_App';
import Neo4jApp from './components/load_from_neo4j_sigma/Neo4j_Simga_App';
import { Neo4jProvider, createDriver } from 'use-neo4j';
import './index.css';

const driver = createDriver('bolt', 'localhost', 7687, 'neo4j', null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Neo4jProvider driver={driver}>
      <SimpleApp />
      <Neo4jApp />
    </Neo4jProvider>
  </React.StrictMode>
);