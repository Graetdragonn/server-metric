import axios from "axios";
import * as Constants from "../constants";

class ServerService {

    /**
     * Get all servers
     * @returns list of all servers
     */
    async getAllServers() {
        var res = "";
        var config = {
            method: 'get',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'servers/getAllServers',
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
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
     * Get server by address
     * @param address server address
     * @returns server address if exists, null otherwise
     */
    async getServerByAddress(address: string) {
        var res = "";
        var config = {
            method: 'get',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'servers/getServerByAddress/' + address,
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
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
     * Add server to server list
     * @param address server address
     * @returns error if fail
     */
    async addToServerList(address: string) {
        var res = "";
        var config = {
            method: 'post',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'servers/addServer',
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")},
            data: {address: address}
        };

        await axios(config)
            .then(function (response: { data: any; }) {
                res = JSON.stringify(response.data);
            })
            .catch(function (error: any) {
               // alert(error);
            });
        return res;
    }

    /**
     * Deletes server from list
     * @param address server address
     * @returns error if fail
     */
    async deleteFromServerList(address: string) {
        var res = "ERROR";
        var config = {
            method: 'delete',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'servers/delete/' + address,
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")},
            data: {}
        };

        await axios(config)
            .then(function (response: { data: any; }) {
                res = JSON.stringify(response.data);
            })
            .catch(function (error: any) {
               // alert(error);
            });
        return res;
    }

    /**
     * Sets last time user was sent an email about server being down
     * @param address  server address
     * @param lastTimeNotified  last time notified in milliseconds
     * @returns error if fail
     */
    async updateLastTimeNotified(address: string, lastTimeNotified: number) {
        var res = "";
        var config = {
            method: 'put',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'servers/updateLastTimeNotified/' + address,
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")},
            data: { lastTimeNotified: lastTimeNotified }
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
     * Gets last time user was sent an email about server being down
     * @param address  server address
     * @returns time in milliseconds of last time user was sent an email
     */
    async getLastTimeNotified(address: string) {
        var res = "";
        var config = {
            method: 'get',
            url: Constants.USER_API_BASE_URL + Constants.API_VERSION + 'servers/getLastTimeNotified/' + address,
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
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

export default new ServerService()
