import React from 'react';
import { render } from 'react-dom';
import SimpleReactPixiApp from './components/simple_ex/Simple_App';
import Neo4jReactPixiApp from './components/load_from_neo4j/Neo4j_ReactPixi_App.js';
import { Neo4jProvider, createDriver } from 'use-neo4j';
import './index.css';

const driver = createDriver('bolt', 'localhost', 7687, 'neo4j', null)


const container = document.getElementById('root');

render(
  <React.StrictMode>
    <Neo4jProvider driver={driver}>
      <SimpleReactPixiApp/>
      <Neo4jReactPixiApp/>
    </Neo4jProvider>
  </React.StrictMode>,
  container
);