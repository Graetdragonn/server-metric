import React, {useState, useEffect} from "react";
import { ComposableMap, Geographies, Geography} from "react-simple-maps";

const geoURL =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function WorldMap() {
    return (
        <div>
            <ComposableMap>
                <Geographies 
                    geography={geoURL}
                    fill="#D6D6DA"
                    stroke="#FFFFFF"
                    strokeWidth={0.5}>
                        
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography 
                                key={geo.rsmKey} 
                                geography={geo}
                                style={{
                                    default: {outline: "none"},
                                    hover: {outline: "none"},
                                    pressed: {outline: "none"}
                                }} />
                        ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
}