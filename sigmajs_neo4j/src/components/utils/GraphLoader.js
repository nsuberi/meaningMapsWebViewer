import { React, useEffect } from "react";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

function GraphLoader(props){
    const LoadGraph = () => {
        const loadGraph = useLoadGraph();
      
        useEffect(() => {
          loadGraph(props.graph);
          //loadGraph(graph2);
        }, [loadGraph]);
      
        return null;
      };
    
      return (
        <div>
          {props.header}
          <SigmaContainer style={{ height: "500px", width: "100%" }}>
            <LoadGraph/>
          </SigmaContainer>
        </div>
      );
}

export default GraphLoader;