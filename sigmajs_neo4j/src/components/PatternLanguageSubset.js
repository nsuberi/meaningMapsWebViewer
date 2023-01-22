import React from 'react';

import './load_from_neo4j/App.css'
import "@react-sigma/core/lib/react-sigma.min.css";

import { Graph } from 'graphology';
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import GraphLoader from './utils/GraphLoader';

function PatternLanguageSubset(props) {
    const sigma = useSigma();

    return (
        <div>
          <GraphLoader graph={sigma.getGraph()}/>
        </div>
    );
}

export default PatternLanguageSubset;