import React from 'react';

import './load_from_neo4j/App.css'
import "@react-sigma/core/lib/react-sigma.min.css";

import { AppContext } from './load_from_neo4j/Neo4j_Simga_App';
import { useContext, useEffect } from 'react';
import { useReadCypher } from 'use-neo4j';

import { Graph } from 'graphology';
import { useLoadGraph, useRegisterEvents, useSigma, useSetSettings } from "@react-sigma/core";
import GraphLoader from './utils/GraphLoader';
import { cacheGroupMembership, layout_pattern_language } from '../functions/layout_pattern_language';

function PatternLanguageSubset(props) {
    const {selectedNode, setSelectedNode} = useContext(AppContext);
    const { cypher, error, loading, first, records } = useReadCypher('MATCH (ptrn:Pattern)-[relation]->(n) RETURN *');
    const sigma = useSigma();
    const setSettings = useSetSettings();

    let header = (<div className="ui active dimmer">Loading...</div>)
    // TODO: multi flag doesn't appear to be working
    let graph = new Graph({multi:true});
    console.log(graph)

    if ( error ) {
        header = (<div className="ui negative message">{ error.message }</div>)
    } 
    else if ( !loading ) {
        if (first) {
            console.log(records)

            const count = records.length
            header = (<div>There are {count} nodes in the database.</div>)

            let group_pattern_id_map = {}

            // Initialize and populate Graphology graph with data
            records.forEach((record)=> {
                const pattern = record.get('ptrn')
                const node_id = pattern.identity
                console.log("pattern: ");
                console.log(pattern);
                const pattern_id = pattern.properties.id
                const group_id = pattern.properties.group

                if (!graph.hasNode(node_id)) {
                    graph.addNode(node_id, {
                        pattern: pattern_id,
                        group: group_id,
                        name: pattern.properties.name,
                        headline: pattern.properties.headline,
                        identity: node_id
                    })
                    
                    cacheGroupMembership(group_pattern_id_map, group_id, pattern_id)
                } 
            });
            records.forEach((record)=> {
              const edge = record.get('relation')
              console.log("edge:")
              console.log(edge);
              if (edge.type == 'contains'){
                try {
                  graph.addEdge(edge.start, edge.end, {type: edge.type} )
                } catch (error) {
                  console.log(error)
                }
              }
            })
            //console.log("subset")
            //console.log(graph)
            //console.log(group_pattern_id_map)
            layout_pattern_language(graph, group_pattern_id_map)
        }
    }
    /*
    useEffect(() => {
        subgraph = filter_graph(graph, selectedNode);
    }, [selectedNode]);
    */

  useEffect(() => {
    setSettings({
      nodeReducer: (node, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, highlighted: data.highlighted || false };

        if (selectedNode) {
          if (node === selectedNode || graph.neighbors(selectedNode).includes(node)) {
            newData.highlighted = true;
          } else {
            //console.log('====')
            //console.log(newData);
            //newData.color = "#E2E2E2";
            newData.color = newData.color+"80";
            newData.highlighted = false;
          }
        }
        return newData;
      },
      edgeReducer: (edge, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, hidden: false };

        if (selectedNode && !graph.extremities(edge).includes(selectedNode)) {
          newData.hidden = true;
        }
        return newData;
      },
    });
  }, [selectedNode, setSettings]);
    return (
        <div>
          <GraphLoader header={header} graph={graph}/>
          {selectedNode}
          {JSON.stringify(graph)}
        </div>
    );
}

export default PatternLanguageSubset;