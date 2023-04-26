import UserService from "../../requests/UserService";

/**
 * Get all users in database (no token needed)
 * @returns array of all users
 */
export async function getAllUserEmails(){
    var res = await UserService.getAllUserEmails();
    return JSON.parse(res);
}

/**
 * Checks if a specific email is registered in the database
 * @param email user email
 * @returns true if email is in database, false otherwise
 */
export function checkEmailInDatabase(userEmails: string[], inputEmail: string) {
    var result = false;
    userEmails.forEach((userEmail: string) => {
        if (inputEmail === userEmail) {
            result = true; 
        }
    });
    return result;
}

/**
 * Generates random password for the password reset.
 * Creates a string of length = 10 using the characters below:
 * 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
 */
export function generatePassword() {
    var characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passLength = 10;
    var password = "";
    for (var i = 0; i < passLength; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}
