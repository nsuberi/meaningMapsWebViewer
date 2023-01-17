
import { PixiComponent } from '@inlet/react-pixi'
import { Text } from '@inlet/react-pixi'

/// Proposed here... but it doesn't render: https://medium.com/thinknum/writing-high-performance-react-pixi-code-c8c75414020b
const FastText = PixiComponent('FastText', {
  create: props => new Text(props.text),
  applyProps: (instance, oldProps, props) => {
    const { x, y, text } = props;

    if (x !== oldProps.x || y !== oldProps.y) {
      instance.x = x;
      instance.y = y;
    }

    if (text !== oldProps.text) {
      instance.text = text;
    }
  },
});

export default FastText;