import axios from "axios";
import * as Constants from "../constants";

class GeolocationService {
    async getIPGeolocation(address: string) {
        var res = "";
        var config = {
            method: 'get',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'geolocation/ip/' + address,
            headers: {}
        };
        await axios(config)
            .then(function (response: { data: any; }) {
                res = JSON.stringify(response.data);
            })
            .catch(function (error: any) {
                //alert(error);
            });
        return res;
    }

    async getClientGeolocation(address: string) {
        var res = "";
        var config = {
            method: 'get',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'geolocation/serverip/' + address,
            headers: {}
        };
        await axios(config)
            .then(function (response: { data: any; }) {
                res = JSON.stringify(response.data);
            })
            .catch(function (error: any) {
                //alert(error);
            });
        return res;
    }
}

export default new GeolocationService()