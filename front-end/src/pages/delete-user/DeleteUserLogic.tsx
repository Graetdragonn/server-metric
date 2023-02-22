import UserService from "../../requests/UserService";

/**
 * Delete a user by email
 * @param email user email
 * @returns true on success, false otherwise
 */
export async function deleteUser(email: string) {
    await deleteUserServers(email);
    const res = await UserService.deleteUserByEmail(email);
    if(res === "ERROR"){
        return false;
    }
    else {
        return true;
    }
}

/**
 * Delete user's server list
 * @param email user email
 */
export async function deleteUserServers(email: string){
    const userInfo = await UserService.getUserByEmail(email);
    var userData = JSON.parse(userInfo);
    var password = userData['userPassword'];
    var userType = userData['userType'];
    var firstName = userData['userFirstName'];
    var lastName = userData['userLastName'];
    await UserService.updateUser(email, firstName, lastName, password, userType, [])
}