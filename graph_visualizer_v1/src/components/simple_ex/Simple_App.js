import React from 'react';
import './App.css';
import { Graph } from 'graphology';

import { useEffect } from "react";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

function SimpleApp() {
  
  const LoadGraph = (graph) => {
      const loadGraph = useLoadGraph();
    
      useEffect(() => {
        const graph = new Graph();
        graph.addNode("first", { x: 0, y: 0, size: 15, label: "My first node", color: "#FA4F40" });
        loadGraph(graph);
      }, [loadGraph, graph]);
    
      return null;
    };

  return (
    <div>
      <SigmaContainer style={{ height: "500px", width: "500px" }}>
        <LoadGraph/>
      </SigmaContainer>
    </div>
  );

}

export default SimpleApp;