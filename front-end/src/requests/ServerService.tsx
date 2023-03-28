import axios from "axios";

const USER_API_BASE_URL = "http://coms-402-sd-05.class.las.iastate.edu:8080/";

class ServerService {

    /**
     * Get all servers
     * @returns list of all servers
     */
    async getAllServers() {
        var res = "";
        var config = {
            method: 'get',
            url: USER_API_BASE_URL + 'api/v1/servers/getAllServers',
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
            url: USER_API_BASE_URL + 'api/v1/servers/getServerByAddress/' + address,
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
            url: USER_API_BASE_URL + 'api/v1/servers/addServer',
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
            url: USER_API_BASE_URL + 'api/v1/servers/delete/' + address,
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

}

export default new ServerService()
