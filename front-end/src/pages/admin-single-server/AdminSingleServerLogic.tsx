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

/**
 * Remove a server from a user
 * @param user user email
 * @param server server address
 * @returns true if success, false otherwise
 */
export async function removeServerFromUser(user: string, server: string) {
    var res = await UserService.removeServerFromUser(user, server);
    if (res === "ERROR") {
        return false;
    }
    else {
        return true;
    }
}