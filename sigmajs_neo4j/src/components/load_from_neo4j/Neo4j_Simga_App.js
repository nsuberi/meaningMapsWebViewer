import React from 'react';
import { useEffect } from "react";
import PatternLanguageSubset from '../PatternLanguageSubset';
import { SigmaContainer } from '@react-sigma/core';

import './App.css';

import PatternLanguageOverview from './Pattern_Language_Overview';



function Neo4jSigmaApp() {
  return (
    <div>
      <SigmaContainer style={{ height: "500px", width: "100%" }}>
        <PatternLanguageOverview/>
      </SigmaContainer>
      <SigmaContainer style={{ height: "500px", width: "100%" }}>
        <PatternLanguageSubset/>
      </SigmaContainer>
    </div>

  );

}

export default Neo4jSigmaApp;

