import React from 'react';
import { createContext, useState } from "react";
import PatternLanguageSubset from '../PatternLanguageSubset';
import { SigmaContainer } from '@react-sigma/core';

import './App.css';

import PatternLanguageOverview from './Pattern_Language_Overview';

const AppContext = createContext({id: 1});

function Neo4jSigmaApp() {
  const [selectedNode, setSelectedNode] = useState(1);
  return (
    <AppContext.Provider value={{selectedNode, setSelectedNode}}>
      <div style={{display: "flex", flex_direction: "row"}}>
        <SigmaContainer style={{ height: "500px", width: "50%"}}>
          <PatternLanguageOverview/>
        </SigmaContainer>
        <SigmaContainer style={{ height: "500px", width: "50%"}}>
          <PatternLanguageSubset/>
        </SigmaContainer>
      </div>
    </AppContext.Provider>

  );

}

export {Neo4jSigmaApp, AppContext};

