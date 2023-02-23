import UserService from "../../requests/UserService";

/**
 * Get all users in database
 * @returns array of all users
 */
export async function getAllUsers(){
    var res = await UserService.getUsers();
    return JSON.parse(res);
}

export async function getUserInfo(email: string) {
    const userInfo = await UserService.getUserByEmail(email);
    var userData = JSON.parse(userInfo);
    var password = userData['userPassword'];
    var userType = userData['userType'];
    var firstName = userData['userFirstName'];
    var lastName = userData['userLastName'];
    var servers = userData['servers'];
    return userData;
}