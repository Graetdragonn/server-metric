import UserService from "../../requests/UserService";

export async function getAllUsers(){
    var res = await UserService.getUsers();
    return JSON.parse(res);
}