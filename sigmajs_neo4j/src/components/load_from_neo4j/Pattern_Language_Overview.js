import React from 'react';
import {useContext} from 'react';
import { AppContext } from './Neo4j_Simga_App';

import './App.css';

import { Graph } from 'graphology';
import { useReadCypher } from 'use-neo4j';

import {layout_pattern_language, cacheGroupMembership} from '../../functions/layout_pattern_language';

import GraphLoader from '../utils/GraphLoader';


function PatternLanguageOverview(props) {

    const { cypher, error, loading, first, records } = useReadCypher('MATCH (ptrn:Pattern)-[relation]->() RETURN *');
    const {selectedNode, setSelectedNode} = useContext(AppContext);

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
                const pattern_id = pattern.properties.id
                const group_id = pattern.properties.group

                if (!graph.hasNode(node_id)) {
                    graph.addNode(node_id, {
                    pattern: pattern_id,
                    group: group_id,
                    name: pattern.properties.name,
                    headline: pattern.properties.headline
                    })
                    
                    cacheGroupMembership(group_pattern_id_map, group_id, pattern_id)
                } 
            });
            // records.forEach((record)=> {
            //   const edge = record.get('relation')
            //   if (edge.type == 'contains'){
            //     try {
            //       graph.addEdge(edge.start, edge.end, {type: edge.type, multi:true} )
            //     } catch (error) {
            //       console.log(error)
            //     }
            //   }
                
            // })

            console.log(graph)
            console.log(group_pattern_id_map)
            layout_pattern_language(graph, group_pattern_id_map)
        }
    }
    
    // Print node attribtues to console
    // console.log(graph)
    // graph.forEachNode(node => {
    //   consale.log(graph.getNodeAttributes(node))
    // });


    // if props.selectedId / props.selectedIdList are not null, filter for or highlight the related nodes
    return (
        <div>
          <GraphLoader header={header} graph={graph}/>
        </div>
      );
}




export default PatternLanguageOverview;