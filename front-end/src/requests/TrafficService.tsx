import axios from "axios";

const USER_API_BASE_URL = "http://coms-402-sd-05.class.las.iastate.edu:8080/";

class TrafficService {

    /**
     * Get all traffic
     * @returns list of packets sent
     */
    async getAllTraffic() {
        var res = "";
        var config = {
            method: 'get',
            url: USER_API_BASE_URL + 'api/v1/traffic',
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

export default new TrafficService()