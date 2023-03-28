import UserService from "../../requests/UserService";
import { isEmpty, checkEmail } from "../create-account/CreateAccountLogic";

/**
 * Sends JSON request to login
 * @param email User email
 * @param pass  User password
 */
export async function submit(email: string, pass: string) {
    const res = await UserService.signIn(email, pass);
    if (res === "") {
        return false;
    }
    localStorage.setItem("token", JSON.parse(res)["token"]);
    return true;
}

/**
 * Checks to make sure no field is empty
 * @param s string in input field
 * @returns true if field is empty, false otherwis
 */
export function checkEmpty(s: string): boolean {
    return isEmpty(s);
}

/**
 * Checks email format
 * @param email User email
 * @returns true if is email format, false otherwise
 */
export function emailCheck(email: string): boolean {
    return checkEmail(email);
}

/**
 * Get user type
 * @param user user email
 * @returns user type
 */
export async function getUserType(user: string){
    const userInfo = await UserService.getUserByEmail(user);
    var userData = JSON.parse(userInfo);
    var userType = userData['userType'];
    return userType;
}
