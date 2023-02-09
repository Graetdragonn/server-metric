import UserService from "../../components/user/UserService";
import { isEmpty, checkEmail } from "../create-account/CreateAccountLogic";

/**
 * Sends JSON request to login
 * @param email User email
 * @param pass  User password
 */
export async function submit(email: string, pass: string) {
    try {
        const res = await UserService.getUserByEmail(email);
        var password = JSON.parse(res);
        password = password['userPassword'];
        return checkPass(pass, password);
    }
    catch {
        return false;
    }
}

/**
 * Checks that the user's input password is correct
 * @param userInputPass the password the user input
 * @param actualPass the password in database
 * @returns true if passwords match, false otherwise
 */
function checkPass(userInputPass: string, actualPass: string): boolean {
    return userInputPass === actualPass;
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