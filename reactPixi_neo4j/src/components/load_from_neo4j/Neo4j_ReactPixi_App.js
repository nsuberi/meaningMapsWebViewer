import React from 'react';
import { useReadCypher } from 'use-neo4j';
import './App.css';
import { Graph } from 'graphology';

import { useEffect, useRef } from "react";

import { PixiComponent, Stage, Container } from '@inlet/react-pixi'
import * as PIXI from "pixi.js";

// https://pixijs.download/dev/docs/PIXI.Graphics.html
const Rectangle = PixiComponent('Rectangle', {
  create: props => new PIXI.Graphics(),
  applyProps: (instance, oldProps, props) => {
    const { x, y, width, height, fill, alpha } = props;

    if (x !== oldProps.x || y !== oldProps.y || width !== oldProps.width || height !== oldProps.height || fill !== oldProps.fill) {
      instance.clear();
      instance.beginFill(fill);
      instance.drawRect(x, y, width, height);
      instance.endFill();
    }

    if (alpha !== oldProps.alpha) {
      instance.alpha = alpha;
    }
  },
})

const NodeView = (props) => {
  console.log('Making node with',)
  console.log(props)

  return (
    <Container x={props.graph.getNodeAttribute(3, 'x')} y={props.graph.getNodeAttribute(3, 'y')}>
      <Rectangle x={0} y={0} width={100} height={100} fill={0x000000} />
    </Container>
  );
};

function Neo4jReactPixiApp() {
  
  const { cypher, error, loading, first, records } = useReadCypher('MATCH (ptrn:Pattern) RETURN ptrn')  
  let nodes = (<div></div>)

  // Default to Loading Message
  let result = (<div className="ui active dimmer">Loading...</div>)
  let graph = new Graph();

  if ( error ) {
    result = (<div className="ui negative message">{ error.message }</div>)
  }
  else if ( !loading ) {
    if (first) {
      // console.log(first)

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
        graph.setNodeAttribute(node, 'x', 200) //Math.random() * 100);
        graph.setNodeAttribute(node, 'y', 200) //Math.random() * 100);
        graph.setNodeAttribute(node, 'size', 15);
      });

      // Print node attribtues to console
      // graph.forEachNode(node => {
      //   console.log(graph.getNodeAttributes(node))
      // });


      nodes = (<NodeView graph={graph} />)
    }
  }

  //console.log(graph)

  // let nodes;
  // if (!loading && first ) {
  //    nodes = <NodeView graph={graph} node={0} />
  // } else {
  //    nodes = <div/>
  // }

  

  return (
    <div>
      <Stage options={{ backgroundColor: 0xeef1f5 }}>
          {/* {graph.forEachNode(node => {
            console.log(node);
            <NodeView graph={graph} node={node} />;
          })} */}
        {nodes}
      </Stage>
    </div>
  );


}

export default Neo4jReactPixiApp;

