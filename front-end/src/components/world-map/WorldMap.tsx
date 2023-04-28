import React, {useState, useEffect} from "react";
import { ComposableMap, Geographies, Geography, Sphere} from "react-simple-maps";
import GeolocationService from "../../requests/GeolocationService";
import { renderLines } from "./WorldMapLogic";
import orangeCircle from "../../pages/dashboard/icons8-orange-circle-48.png";
import purpleCircle from "../../pages/dashboard/icons8-purple-circle-48.png";

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
                <p style = {{textAlign: "center"}}> <img style={{ width:20, height: 20}} src={orangeCircle} alt="Logo" /> <span style={{color:"var(--orange_wheel"}}>: Sent Packets &nbsp;</span> <img style={{ width:20, height: 20}} src={purpleCircle} alt="Logo" /> <span style={{color:"var(--some_purple"}}>: Received Packets</span></p>
        </div>
        </>


    );
}