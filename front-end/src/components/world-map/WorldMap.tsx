import React, {useState, useEffect} from "react";
import { ComposableMap, Geographies, Geography, Sphere} from "react-simple-maps";
import GeolocationService from "../../requests/GeolocationService";
import { renderLines } from "./WorldMapLogic";

const geoURL =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function WorldMap(props: {server: string}) {
    const [serverGeo, setServerGeo] = useState({});
    const [sentGeo, setSentGeo] = useState([]);
    const [receivedGeo, setReceivedGeo] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const geoData = JSON.parse(await GeolocationService.getClientGeolocation(props.server));
            const serverGeo = JSON.parse(await GeolocationService.getIPGeolocation(props.server));
            setSentGeo(geoData[0]);
            setReceivedGeo(geoData[1]);
            setServerGeo(serverGeo);
            console.log(geoData[1])
        }
        getData();
    }, [])

    return (<>
            <div className={"div-for-graphs"}>
            <h3 style={{textAlign: "center", color: "var(--better_black)"}}>Geo Map of Packets Sent/Received</h3>
            <ComposableMap width={1300} height={600} projectionConfig={{scale: 200}}>
                <Sphere id="" fill="none" stroke="#000000" strokeWidth={1} />
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
                {renderLines(serverGeo, sentGeo, "var(--orange_wheel)")}
                {renderLines(serverGeo, receivedGeo, "var(--some_purple)")}
            </ComposableMap>
        </div>
        </>


    );
}