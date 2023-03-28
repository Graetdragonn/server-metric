import UserService from '../../requests/UserService';

/**
 * Checks that user confirmed password correctly
 * @param pass        User password
 * @param confirmPass User confirm password
 * @returns true if passwords match, false otherwise
 */
export function checkPassword(pass: string, confirmPass: string): boolean {
    if (pass === confirmPass) {

        return true;
    }
    return false;
}

/**
 * Checks to make sure no field is empty
 * @param s string in input field
 * @returns true if field is empty, false otherwise
 */
export function isEmpty(s: string): boolean {
    if (s === "") {
        alert("Field cannot be left empty");
        return true;
    }
    return false;
}

/**
 * Checks if user has selected user type
 * @param s User type selected
 * @returns true if user has not selected, false otherwise
 */
export function isTypeDefault(s: string): boolean {
    if (s === "default" || s === "") {
        return true;
    }
    return false;
}

/**
 * Checks email format
 * @param email User email
 * @returns true if is email format, false otherwise
 */
export function checkEmail(email: string): boolean {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
        return true;
    }
    return false;
}

/**
 * Submit edits
 * @param email user email
 * @param first user first name
 * @param last user last name
 * @param pass user password
 * @param user user type
 * @param servers user's servers
 * @returns true on success, false otherwise
 */
export async function submitEdits(email: string, first: string, last: string, pass: string, user: string, servers: string[]) {
    const res = await UserService.updateUser(email, first, last, pass, user, servers);
    if (res === "") {
        return false;
    }
    return true;
}
