import React from 'react';
import { useEffect } from "react";

import './App.css';

import { useReadCypher } from 'use-neo4j';
import { Graph } from 'graphology';

import {layout_pattern_language} from '../../functions/layout_pattern_language';

import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

function safeAdd(arrays, array_id, elem) {
    if ( array_id in arrays ) {
      arrays[array_id].push(Number(elem))
    } else {
      arrays[array_id] = [Number(elem)]
    } 
  }

function Neo4jSigmaApp() {
  const { cypher, error, loading, first, records } = useReadCypher('MATCH (ptrn:Pattern) RETURN ptrn')  

  // Default to Loading Message
  let result = (<div className="ui active dimmer">Loading...</div>)
  let graph = new Graph();
  console.log(graph)

  if ( error ) {
  result = (<div className="ui negative message">{ error.message }</div>)
  } 
  else if ( !loading ) {
      if (first) {
          //console.log(first)

          const count = records.length
          result = (<div>There are {count} nodes in the database.</div>)

          let group_node_id_map = {}

          // Initialize and populate Graphology graph with data
          records.forEach((record)=> {
              const pattern = record.get('ptrn')
              const node_id = pattern.properties.id
              const group_id = pattern.properties.group

              graph.addNode(node_id, {
                  group: group_id,
                  name: pattern.properties.name,
                  headline: pattern.properties.headline
              })

              // Cache which nodes belong to which groups
              safeAdd(group_node_id_map, group_id, node_id)
          })
  
          // Add layout and display information to the loaded data
          if (graph) {
              console.log(graph)
              console.log(group_node_id_map)
              layout_pattern_language(graph, group_node_id_map)
          }
      }
  }
  // var graph = load_pattern_language()

  // Print node attribtues to console
  // console.log(graph)
  // graph.forEachNode(node => {
  //   console.log(graph.getNodeAttributes(node))
  // });

  const LoadGraph = () => {
    const loadGraph = useLoadGraph();
  
    useEffect(() => {
      loadGraph(graph);
    }, [loadGraph]);
  
    return null;
  };

  return (
    <div>
      {result}
      <SigmaContainer style={{ height: "500px", width: "100%" }}>
        <LoadGraph/>
      </SigmaContainer>
    </div>
  );

}

export default Neo4jSigmaApp;

