
const y_space_between_groups = 200
const y_space_within_groups = 200
const group_y_anchor_map = Object.fromEntries([...Array(40).keys()].map(y => [y, y * y_space_between_groups]))
const x_space_between_neighbors = 200
const x_per_row = 7


// Determine x , y coordinates
function assignLocation(group_id, node_id, group_node_id_map) {
    
    const y_start = group_y_anchor_map[group_id]
    const x_peers = group_node_id_map[group_id]
    const place_among_peers = x_peers.findIndex(elem => elem == node_id)
    const x = (place_among_peers % x_per_row) * x_space_between_neighbors
    const y = y_start + Math.floor(place_among_peers / x_per_row) * y_space_within_groups

    return [x, y]
}

// Set color of node
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

// Function that takes a graph and attaches the locations and colors to nodes

function layout_pattern_language(graph, group_node_id_map) {
    console.log(graph)
    console.log(group_node_id_map)
    graph.forEachNode(node_id => {
        const group_id = graph.getNodeAttribute(node_id, 'group')
        let [x, y] = assignLocation(group_id, node_id, group_node_id_map)
        graph.setNodeAttribute(node_id, 'x', x);
        graph.setNodeAttribute(node_id, 'y', y);
        graph.setNodeAttribute(node_id, 'size', 5);
        graph.setNodeAttribute(node_id, 'color', group_color_map[group_id]);
        });
}

export {layout_pattern_language}



