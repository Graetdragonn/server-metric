import axios from "axios";

const USER_API_BASE_URL = "";

class UserService {

    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    async createUser(email: string, first: string, last: string, pass: string, user: string){
        const response = await axios.post(USER_API_BASE_URL, { email: email, first: first, last: last, pass: pass, user: user });
        console.log(response);
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