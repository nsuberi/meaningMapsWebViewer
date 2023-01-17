
import { PixiComponent } from '@inlet/react-pixi'
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
  

  export default Rectangle;