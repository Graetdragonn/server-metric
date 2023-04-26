import React from "react"; 
import {Line} from "react-simple-maps";
import GeolocationService from "../../requests/GeolocationService";

export function renderLines(serverGeo: any, geoList: any[], color: any) {
    let retArr: JSX.Element[] = [];
    geoList.forEach(element => {
        retArr.push(<Line 
                    from={[serverGeo.longitude, serverGeo.latitude]}
                    to={[element.longitude, element.latitude]}
                    stroke={color}
                    strokeWidth={1.25}
                    strokeLinecap="round"/>);
    });
    return retArr;
}


