import React from 'react';
import { useReadCypher } from 'use-neo4j';
import './App.css';
import { Graph } from 'graphology';

import { useEffect } from "react";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

const y_space_between_groups = 200
const y_space_within_groups = 200
const group_y_anchor_map = Object.fromEntries([...Array(40).keys()].map(y => [y, y * y_space_between_groups]))
const x_space_between_neighbors = 200
const x_per_row = 7

function assignLocation(group_id, node_id, group_node_id_map) {
    
    const y_start = group_y_anchor_map[group_id]
    const x_peers = group_node_id_map[group_id]
    const place_among_peers = x_peers.findIndex(elem => elem == node_id)
    const x = (place_among_peers % x_per_row) * x_space_between_neighbors
    const y = y_start + Math.floor(place_among_peers / x_per_row) * y_space_within_groups

    return [x, y]
}

function safeAdd(arrays, array_id, elem) {
  if ( array_id in arrays ) {
    arrays[array_id].push(Number(elem))
  } else {
    arrays[array_id] = [Number(elem)]
  } 
}


const spectrumRanges = [
  { from: [255, 0, 0], to: [255, 255, 0] },
  { from: [255, 255, 0], to: [0, 255, 0] },
  { from: [0, 255, 0], to: [0, 255, 255] }
];

const findColorValue = (from, to, leftRatio) => {
  return Math.round(from + (to - from) * leftRatio);
};

const findRgbFromGroupId = (group_id) => {
  const num_groups = 36
  const totalRanges = spectrumRanges.length;
  const rangeWidth = num_groups / totalRanges;
  const includedRange = Math.floor(group_id / rangeWidth);
  const rangeRatio = ((group_id % rangeWidth) / rangeWidth).toFixed(2);
  const { from, to } = spectrumRanges[includedRange];
  return {
    r: findColorValue(from[0], to[0], rangeRatio),
    g: findColorValue(from[1], to[1], rangeRatio),
    b: findColorValue(from[2], to[2], rangeRatio)
  };
};

const rgbToHex = (colors) => {
  const toHex = (rgb) => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = `0${hex}`;
    }
    return hex;
  };
  const red = toHex(colors['r']);
  const green = toHex(colors['g']);
  const blue = toHex(colors['b']);
  return `#${red}${green}${blue}`;
};

const group_color_map = Object.fromEntries(
  [...Array(36).keys()].map(
    group_id => [
      group_id,
      rgbToHex(findRgbFromGroupId(group_id))
    ]
    )
  )

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

        safeAdd(group_node_id_map, group_id, node_id)
      })

      console.log(group_node_id_map)

      // assign layout positions as `x`, `y` node attributes
      graph.forEachNode(node_id => {
        const group_id = graph.getNodeAttribute(node_id, 'group')
        let [x, y] = assignLocation(group_id, node_id, group_node_id_map)
        graph.setNodeAttribute(node_id, 'x', x);
        graph.setNodeAttribute(node_id, 'y', y);
        graph.setNodeAttribute(node_id, 'size', 5);
        graph.setNodeAttribute(node_id, 'color', group_color_map[group_id]);
      });

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
      <div>{result}</div>
      <SigmaContainer style={{ height: "500px", width: "100%" }}>
      <LoadGraph/>
      </SigmaContainer>
    </div>
  );

}

export default Neo4jSigmaApp;

