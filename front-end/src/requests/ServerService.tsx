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
            url: USER_API_BASE_URL + 'api/v1/users/getAllServers/',
            headers: {}
        };

        await axios(config)
            .then(function (response: { data: any; }) {
                res = JSON.stringify(response.data);
            })
            .catch(function (error: any) {
                alert(error);
            });
        return res;
    }

}

export default new ServerService()