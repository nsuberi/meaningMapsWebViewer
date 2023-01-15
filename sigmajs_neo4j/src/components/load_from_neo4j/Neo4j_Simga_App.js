import React from 'react';
import { useEffect } from "react";

import './App.css';

import { Graph } from 'graphology';
import { useReadCypher } from 'use-neo4j';

import {layout_pattern_language, cacheGroupMembership} from '../../functions/layout_pattern_language';

import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";


function Neo4jSigmaApp() {
  const { cypher, error, loading, first, records } = useReadCypher('MATCH (ptrn:Pattern)-[r]->() RETURN *')  

  let header = (<div className="ui active dimmer">Loading...</div>)
  let graph = new Graph();
  console.log(graph)

  if ( error ) {
    header = (<div className="ui negative message">{ error.message }</div>)
  } 
  else if ( !loading ) {
      if (first) {
          console.log(records)

          const count = records.length
          header = (<div>There are {count} nodes in the database.</div>)

          let group_node_id_map = {}

          // Initialize and populate Graphology graph with data
          records.forEach((record)=> {
              const pattern = record.get('ptrn')
              const node_id = pattern.properties.id
              const group_id = pattern.properties.group

              if (!graph.hasNode(node_id)) {
                graph.addNode(node_id, {
                  group: group_id,
                  name: pattern.properties.name,
                  headline: pattern.properties.headline
                })
                
                cacheGroupMembership(group_node_id_map, group_id, node_id)
              } 


          })
  
          // Add layout and display information to the loaded data
          if (graph) {
              console.log(graph)
              console.log(group_node_id_map)
              layout_pattern_language(graph, group_node_id_map)
          }
        }
     }
  
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
      {header}
      <SigmaContainer style={{ height: "500px", width: "100%" }}>
        <LoadGraph/>
      </SigmaContainer>
    </div>
  );

}

export default Neo4jSigmaApp;

