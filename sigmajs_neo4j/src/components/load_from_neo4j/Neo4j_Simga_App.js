import React from 'react';
import { useReadCypher } from 'use-neo4j';
import './App.css';
import { Graph } from 'graphology';

import { useEffect } from "react";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

function Neo4jSigmaApp() {
  
  const { cypher, error, loading, first, records } = useReadCypher('MATCH (ptrn:Pattern) RETURN ptrn')  

  // Default to Loading Message
  let result = (<div className="ui active dimmer">Loading...</div>)
  let graph = new Graph();

  if ( error ) {
    result = (<div className="ui negative message">{ error.message }</div>)
  }
  else if ( !loading ) {
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
        graph.setNodeAttribute(node, 'size', 15);
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
      loadGraph(graph);
    }, [loadGraph]);
  
    return null;
  };

  return (
    <div>
      <div>{result}</div>
      <SigmaContainer style={{ height: "500px", width: "500px" }} greph={{graph}}>
      <LoadGraph/>
      </SigmaContainer>
    </div>
  );

}

export default Neo4jSigmaApp;

