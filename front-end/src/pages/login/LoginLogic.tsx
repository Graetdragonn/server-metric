import { isEmpty, checkEmail } from "../create-account/CreateAccountLogic";

export function submit (email: string, pass: string) {
    
    alert("Email: " + email + ", Password: " + pass );

}

export function checkEmpty(s: string): boolean {
    return isEmpty(s);
}

export function emailCheck(email: string): boolean {
    return checkEmail(email);
}