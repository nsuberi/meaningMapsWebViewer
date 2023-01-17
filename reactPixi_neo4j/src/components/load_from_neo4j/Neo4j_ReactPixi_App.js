import React from 'react';
import { useEffect, useRef } from "react";

import './App.css';

import { Graph } from 'graphology';
import { useReadCypher } from 'use-neo4j';

import { Stage } from '@inlet/react-pixi'
import NodeView  from '../utils/NodeView';

function Neo4jReactPixiApp() {
  
  const { error, loading, first, records } = useReadCypher('MATCH (ptrn:Pattern) RETURN ptrn')  
  let nodes = [];

  // Default to Loading Message
  let header = (<div className="ui active dimmer">Loading...</div>)
  let graph = new Graph();

  if ( error ) {
    header = (<div className="ui negative message">{ error.message }</div>)
  }
  else if ( !loading ) {
    if (first) {
      // console.log(first)

      const count = records.length
      header = (<div>There are {count} nodes in the database.</div>)
      
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
        graph.setNodeAttribute(node, 'x', Math.random() * 500);
        graph.setNodeAttribute(node, 'y', Math.random() * 500);
        graph.setNodeAttribute(node, 'size', 15);
      });

      // Print node attribtues to console
      // graph.forEachNode(node => {
      //   console.log(graph.getNodeAttributes(node))
      // });
    }
  }

  graph.forEachNode(node => {
    console.log(node)
    nodes.push(<NodeView graph={graph} node={node}/>)
  })

  return (
    <div>
      {header}
      <Stage options={{ backgroundColor: 0xeef1f5 }}>
          { nodes } 
      </Stage>
    </div>
  );
}

export default Neo4jReactPixiApp;

