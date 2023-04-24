import React from "react"; 
import { ComposableMap, Geographies, Geography} from "react-simple-maps";


export const WorldMap = () => { 

    return ( 
    <div>
        <ComposableMap>
            <Geographies geography="/features.json">
                {({ geographies:any }) =>
                    geographies.map((geo:any) => (
                        <Geography key={geo.rsmKey} geography={geo} />
                    ))
                }
            </Geographies>
        </ComposableMap>
    </div>)
}


