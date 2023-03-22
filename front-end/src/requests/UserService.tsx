import axios from "axios";

const USER_API_BASE_URL = "http://coms-402-sd-05.class.las.iastate.edu:8080/";

class UserService {
    /**
     * Get all users
     */
    async getUsers() {
        var res = "";
        var config = {
            method: 'get',
            url: USER_API_BASE_URL + 'api/v1/users/getAllUsers',
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
     * Create user
     * @param email user email
     * @param first user first name
     * @param last  user last name
     * @param pass  user password
     * @param user  user type
     * @returns bearer token
     */
    async createUser(email: string, first: string, last: string, pass: string, user: string) {
        var res = "";
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: USER_API_BASE_URL + 'api/v1/auth/register',
            headers: {},
            data: { username: email, password: pass, userType: user, userFirstName: first, userLastName: last }
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
     * Signs in user
     * @param email user email
     * @param pass user passsord
     * @returns bearer token
     */
    async signIn(email: string, pass: string) {
        var res = "";
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: USER_API_BASE_URL + 'api/v1/auth/sign-in',
            headers: {},
            data: { username: email, password: pass }
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
        async updateUser(email: string, first: string, last: string, pass: string, user: string, servers: string[]) {
            var res = "";
            var config = {
                method: 'put',
                url: USER_API_BASE_URL + 'api/v1/users/updateUser/' + email,
                headers: {Authorization: 'Bearer ' + localStorage.getItem("token")},
                data: {password: pass, userType: user, userFirstName: first, userLastName: last, servers: servers}
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
     * Add server to user's list
     * @param email user email
     * @param address server address
     * @returns error if fail
     */
    async addServerToUser(email: string, address: string){
        var res = "";
        var config = {
            method: 'post',
            url: USER_API_BASE_URL + 'api/v1/users/' + email + '/addServer',
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")},
            data: {address: address}
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
     * Remove a server from a user
     * @param email user email
     * @param address server address
     * @returns error if fail
     */
    async removeServerFromUser(email: string, address: string){
        var res = "ERROR";
        var config = {
            method: 'delete',
            url: USER_API_BASE_URL + 'api/v1/users/' + email + '/removeServer',
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")},
            data: {address: address}
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
     * 
     * @param email user email
     * @returns ERROR if fail
     */
    async deleteUserByEmail(email: string) {
        var res = "ERROR";
        var config = {
            method: 'delete',
            url: USER_API_BASE_URL + 'api/v1/users/deleteUser/' + email,
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
        };

        await axios(config)
            .then(function (response: { data: any; }) {
                res = JSON.stringify(response.data);
            })
            .catch(function (error: any) {
                return res;
            });
        return res;
    }

    /**
     * Get users connected to server
     * @param server server address
     * @returns users connected to server
     */
    async getUsersOnServer(server: string) {
        var res = "ERROR";
        var config = {
            method: 'get',
            url: USER_API_BASE_URL + 'api/v1/users/getAllUsersConnectedToServer/' + server,
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
        };

        await axios(config)
            .then(function (response: { data: any; }) {
                res = JSON.stringify(response.data);
            })
            .catch(function (error: any) {
                return res;
            });
        return res;
    }

    /**
     * Add client to servive provider by email
     * @param serviceProvider service provider email
     * @param client client email
     * @returns error if fail
     */
    async addServiceProviderClientByEmail(serviceProvider: string, client: string) {
        var res = "ERROR";
        var config = {
            method: 'put',
            url: USER_API_BASE_URL + 'api/v1/users/' + serviceProvider + '/addClient/' + client,
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
        };

        await axios(config)
            .then(function (response: { data: any; }) {
                res = JSON.stringify(response.data);
            })
            .catch(function (error: any) {
                return res;
            });
        return res;
    }

    /**
     * Delete a client from a service provider's list
     * @param serviceProvider service provider email
     * @param client client email
     * @returns error if fail
     */
    async deleteServiceProviderClientByEmail(serviceProvider: string, client: string) {
        var res = "ERROR";
        var config = {
            method: 'delete',
            url: USER_API_BASE_URL + 'api/v1/users/' + serviceProvider + '/removeClient/' + client,
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
        };

        await axios(config)
            .then(function (response: { data: any; }) {
                res = JSON.stringify(response.data);
            })
            .catch(function (error: any) {
                return res;
            });
        return res;
    }


}

export default new UserService()