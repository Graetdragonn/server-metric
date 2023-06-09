import axios from "axios";
import * as Constants from "../constants";

class TrafficService {

    /**
     * Get all traffic
     * @returns list of packets sent
     */
    async getAllTraffic() {
        var res = "";
        var config = {
            method: 'get',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'traffic',
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

    /**
     * Get all traffic sent from a server
     * @param server address
     */
    async getAllSentTrafficByServer(address: string) {
        var res = "";
        var config = {
            method: 'get',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'traffic' + '/getAllSentTrafficByServer/' + address,
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


    /**
     * Get all traffic sent from a server
     * @param server address
     */
    async getAllReceivedTrafficByServer(address: string) {
        var res = "";
        var config = {
            method: 'get',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'traffic' + '/getAllReceivedTrafficByServer/' + address,
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


    /**
     * Get map of ports sent by address
     * @param address server address
     * @returns map of ports sent by address
     */
    async getMapOfPortsSentByAddress(address: string){
        var res = "";
        var config = {
            method: 'get',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'traffic' + '/getMapOfPortsSentByAddress/' + address,
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

    /**
     * Get map of ports received by address
     * @param address server address
     * @returns map of ports recieved by address
     */
    async getMapOfPortsReceivedByAddress(address: string){
        var res = "";
        var config = {
            method: 'get',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'traffic' + '/getMapOfPortsReceivedByAddress/' + address,
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

    /**
     * Get most recent traffic for a specific address
     * @returns time stamp of latest traffic
     */
    async getLatestTrafficByAddress(address: string) {
        var res = "";
        var config = {
            method: 'get',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'traffic/getLatestTrafficByAddress/' + address,
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

export default new TrafficService()
