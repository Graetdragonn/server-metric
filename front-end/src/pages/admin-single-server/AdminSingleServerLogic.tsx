import UserService from "../../requests/UserService";

/**
 * Get list of users connected to server
 * @param server server address
 * @returns list of users on server
 */
export async function getUsersOnServer(server: string) {
    var res = await UserService.getUsersOnServer(server);
    return JSON.parse(res);
}