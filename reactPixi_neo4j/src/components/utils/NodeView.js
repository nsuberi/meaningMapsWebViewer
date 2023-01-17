import React from 'react';
import { Container, Text } from '@inlet/react-pixi'
import Rectangle from './PIXI.primitives/Rectangle';
import FastText from './PIXI.primitives/FastText';
import * as PIXI from "pixi.js";

const NodeView = (props) => {
    console.log('Making node with',)
    console.log(props)
  
    const x = props.graph.getNodeAttribute(Number(props.node), 'x')
    const y = props.graph.getNodeAttribute(Number(props.node), 'y')
    const text = props.graph.getNodeAttribute(Number(props.node), 'name')
  
    // This causes error
    // <FastText x={x} y={y} text={text}/>
  
    return (
      <Container x={x} y={y}>
        <Text
            text={text}
            anchor={0.5}
            x={0}
            y={0}
            style={
              new PIXI.TextStyle({
                align: 'center',
                fontFamily: '"Times New Roman","Source Sans Pro", Helvetica, sans-serif',
                fontSize: 50,
                fontWeight: 400,
                fill: ['#ffffff', '#00ff99'], // gradient
                stroke: '#01d27e',
                strokeThickness: 5,
                letterSpacing: 10,
                dropShadow: true,
                dropShadowColor: '#ccced2',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440,
              })
            }
            />
        <Rectangle x={0} y={0} width={100} height={100} fill={0x000000} />
      </Container>
    );
  };

  export default NodeView;