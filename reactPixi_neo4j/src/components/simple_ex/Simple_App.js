import React from 'react';
import './App.css';

import { Stage, Sprite } from '@inlet/react-pixi'
import * as PIXI from "pixi.js";

const bunny = "https://i.imgur.com/IaUrttj.png";

function SimpleReactPixiApp() {
  return (
    <div>
      <Stage>
        <Sprite 
          texture={PIXI.Texture.from(bunny)} x={100} y={100} />
      </Stage>
    </div>
  );
}

export default SimpleReactPixiApp;