import axios from "axios";

const USER_API_BASE_URL = "http://coms-402-sd-05.class.las.iastate.edu:8080/";

class UserService {

    getUsers() {
        alert("here");

        var config = {
            method: 'get',
            url: 'http://localhost:8080/api/v1/users/getAllUsers',
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
        //     const url = USER_API_BASE_URL + "api/v1/users/addUser";
        //     let headers = {
        //         'Content-Type': 'application/json',
        //         "Access-Control-Allow-Origin": "*",
        //     };
        //     const response =  axios.post(url, { userEmail: email, userPassword: pass, userType: "CLIENT" }, {'Content-Type', 'application/json',
        //     "Access-Control-Allow-Origin": "*"}).then((response) => {
        //         alert(response.data);}).catch((error) => {alert(error);});
        //   //  alert(response);
        //     // return response;
        //var axios = require('axios');
        var data = '{\n    "userEmail": "miboer@iastate.edu",\n    "userPassword": "password",\n    "userType": "CLIENT"\n}';

        var config = {
            method: 'post',
            url: 'http://coms-402-sd-05.class.las.iastate.edu:8080/api/v1/users/addUser',
            headers: {'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": 'http://localhost:3000'},
            data: data
        };

        axios(config)
            .then(function (response: { data: any; }) {
                alert(JSON.stringify(response.data));
            })
            .catch(function (error: any) {
                alert(error);
            });


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