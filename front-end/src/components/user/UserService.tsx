import axios from "axios";

const USER_API_BASE_URL = "coms-402-sd-05.class.las.iastate.edu:8080/";

class UserService {

    getUsers() {
        // const url = USER_API_BASE_URL + "api/v1/users/getAllUsers"
        // return axios.get(url);
        alert("here");
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'coms-402-sd-05.class.las.iastate.edu:8080/api/v1/users/getAllUsers',
            headers: {}
        };

        let res = axios(config)
            .then(function (response: { data: any; }) {
                alert(JSON.stringify(response.data));
            })
            .catch(function (error: any) {
                alert(error);
            });
        
            alert(res);

    }

    createUser(email: string, first: string, last: string, pass: string, user: string) {
        const url = USER_API_BASE_URL + "api/v1/users/addUser";
        // const response =  axios.post(url, { userEmail: email, userPassword: pass, userType: "CLIENT" });

        // return response;
        var axios = require('axios');
        var data = '{\n    "userEmail": "miboer@iastate.edu",\n    "userPassword": "password",\n    "userType": "CLIENT"\n}';

        var config = {
            method: 'post',
            url: 'coms-402-sd-05.class.las.iastate.edu:8080/api/v1/users/addUser',
            headers: {},
            data: data
        };

        axios.post(url, { userEmail: email, userPassword: pass, userType: "CLIENT" });

    }

    // getEmployeeById(employeeId){
    //     return axios.get(USER_API_BASE_URL + '/' + employeeId);
    // }

    // updateEmployee(employee, employeeId){
    //     return axios.put(USER_API_BASE_URL + '/' + employeeId, employee);
    // }

    // deleteEmployee(employeeId){
    //     return axios.delete(USER_API_BASE_URL + '/' + employeeId);
    // }
}

export default new UserService()