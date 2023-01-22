import { React, useEffect, useState } from "react";
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

function GraphLoader(props){
    const [header, setHeader] = useState(props.header);
    const LoadGraph = () => {
        const loadGraph = useLoadGraph();
        const registerEvents = useRegisterEvents();
        const sigma = useSigma();
        const [hoveredNode, setHoveredNode] = useState(null);

        useEffect(() => {
          loadGraph(props.graph);
          registerEvents({
            enterNode: (event) => {
                setHoveredNode(event.node); console.log(event.node);
                setHeader(sigma.getGraph().getNodeAttribute(event.node, 'headline'));
                //sigma.getGraph().setNodeAttribute(event.node, "highlighted", true);
              },
            leaveNode: () => setHoveredNode(null),
          });
          //loadGraph(graph2);
        }, [loadGraph, registerEvents]);

        //   Line 12:12:  React Hook useEffect has an unnecessary dependency: 'props.graph'. Either exclude it or remove the dependency array. Outer scope values like 'props.graph' aren't valid dependencies because mutating them doesn't re-render the component  react-hooks/exhaustive-deps
        //  This error is raised if including props.graph in the dependencies list
        return null;
      };
    
      return (
        <div>
          <div style={{height: "100px"}}>{header}</div>
          <LoadGraph/>
        </div>
      );
}

export default GraphLoader;