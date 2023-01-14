import React from 'react';
import { useReadCypher } from 'use-neo4j';
import './App.css';
import { Graph } from 'graphology';

import { useEffect } from "react";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

function App() {
  
  const { cypher, error, loading, first, records } = useReadCypher('MATCH (ptrn:Pattern) RETURN ptrn')  

  // Default to Loading Message
  let result = (<div className="ui active dimmer">Loading...</div>)
  let graph = new Graph();

  // Was there an error ointhe query?
  if ( error ) {
    result = (<div className="ui negative message">{ error.message }</div>)
  }
  else if ( !loading ) {
    // Get the count
    if (first) {
      console.log(first)

      const count = records.length
      result = (<div>There are {count} nodes in the database.</div>)
      
      // Initialize and populate Graphology graph with data
      records.forEach((record)=> {
        const pattern = record.get('ptrn')
        const node_id = pattern.properties.id
        
        graph.addNode(node_id, {
          group: pattern.properties.group,
          name: pattern.properties.name,
          headline: pattern.properties.headline
        })
      })
      
      // assign layout positions as `x`, `y` node attributes
      graph.forEachNode(node => {
        graph.setNodeAttribute(node, 'x', Math.random());
        graph.setNodeAttribute(node, 'y', Math.random());
      });

      // Print node attribtues to console
      graph.forEachNode(node => {
        console.log(graph.getNodeAttributes(node))
      });

    }
  }


  const LoadGraph = () => {
      const loadGraph = useLoadGraph();
    
      useEffect(() => {
        // const graph = new Graph();
        // graph.addNode("first", { x: 0, y: 0, size: 15, label: "My first node", color: "#FA4F40" });
        loadGraph(graph);
      }, [loadGraph, graph]);
    
      return null;
    };

  // return (
  //   <div className="App">
  //     <pre>{result}</pre>
  //   </div>
  // );

  return (
    <div>
      <div>{result}</div>
      <SigmaContainer style={{ height: "500px", width: "500px" }}>
        <LoadGraph/>
      </SigmaContainer>
    </div>
  );

}

export default App;