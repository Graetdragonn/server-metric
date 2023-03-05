import UserService from "../../requests/UserService";

/**
 * Get all users in database
 * @returns array of all users
 */
export async function getAllUsers(){
    var res = await UserService.getUsers();
    return JSON.parse(res);
}

/**
 * Get user data from email
 * @param email user email
 * @returns user data
 */
export async function getUserInfo(email: string) {
    const userInfo = await UserService.getUserByEmail(email);
    var userData = JSON.parse(userInfo);
    return userData;
}