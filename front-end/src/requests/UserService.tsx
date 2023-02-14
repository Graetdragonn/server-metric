import axios from "axios";

const USER_API_BASE_URL = "http://coms-402-sd-05.class.las.iastate.edu:8080/";

class UserService {
    /**
     * Get all users
     */
    getUsers() {
        var config = {
            method: 'get',
            url: USER_API_BASE_URL + 'api/v1/users/getAllUsers',
            headers: {}
        };
        axios(config)
            .then(function (response: { data: any; }) {
                alert(JSON.stringify(response.data));
            })
            .catch(function (error: any) {
                alert(error);
            });
    }

    /**
     * Create user
     * @param email user email
     * @param first user first name
     * @param last  user last name
     * @param pass  user password
     * @param user  user type
     * @returns user information
     */
    async createUser(email: string, first: string, last: string, pass: string, user: string) {
        var res = "";
        var config = {
            method: 'post',
            url: USER_API_BASE_URL + 'api/v1/users/addUser',
            headers: {},
            data: { userEmail: email, userPassword: pass, userType: "CLIENT", userFirstName: first, userLastName: last }
        };

        await axios(config)
            .then(function (response: { data: any; }) {
                res = JSON.stringify(response.data);
            })
            .catch(function (error: any) {
                
            });

        return res;
    }

        /**
     * Update user Info
     * @param email user email
     * @param first user first name
     * @param last  user last name
     * @param pass  user password
     * @param user  user type
     * @returns user information
     */
        async updateUser(email: string, first: string, last: string, pass: string, user: string) {
            var res = "";
            console.log("Email in UserService: " + email);
            var config = {
                method: 'put',
                url: USER_API_BASE_URL + 'api/v1/users/updateUser/' + email,
                headers: {},
                data: {userPassword: pass, userType: "CLIENT", userFirstName: first, userLastName: last }
            };
    
            await axios(config)
                .then(function (response: { data: any; }) {
                    res = JSON.stringify(response.data);
                })
                .catch(function (error: any) {
                    
                });
    
            return res;
        }
    
    /**
     * Get user by email
     * @param email user email
     * @returns user information
     */
    async getUserByEmail(email: string) {
        var res = "";
        var config = {
            method: 'get',
            url: USER_API_BASE_URL + 'api/v1/users/getUserByEmail/' + email,
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

export default new UserService()