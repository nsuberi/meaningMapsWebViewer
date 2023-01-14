import React from 'react';
import ReactDOM from 'react-dom/client';
import SimpleSigmaApp from './components/sigmajs/simple_ex/Simple_App';
import Neo4jSigmaApp from './components/sigmajs/load_from_neo4j/Neo4j_Simga_App';
import { Neo4jProvider, createDriver } from 'use-neo4j';
import './index.css';

const driver = createDriver('bolt', 'localhost', 7687, 'neo4j', null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Neo4jProvider driver={driver}>
      <SimpleSigmaApp />
      <Neo4jSigmaApp />
    </Neo4jProvider>
  </React.StrictMode>
);