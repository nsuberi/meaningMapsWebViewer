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

        //   Line 12:12:  React Hook useEffect has an unnecessary dependency: 'props.graph'. Either exclude it or remove the dependency array. Outer scope values like 'props.graph' aren't valid dependencies because mutating them doesn't re-render the component  react-hooks/exhaustive-deps
        //  This error is raised if including props.graph in the dependencies list
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