import { isEmpty, checkEmail } from "../create-account/CreateAccountLogic";

/**
 * Sends JSON request to login
 * @param email User email
 * @param pass  User password
 */
export function submit (email: string, pass: string) {
    
    alert("Email: " + email + ", Password: " + pass );

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