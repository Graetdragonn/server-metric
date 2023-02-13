import UserService from '../../requests/UserService';
import { isEmpty, checkEmail } from "../create-account/CreateAccountLogic";




export function getUserInfo(email: string) {
    const userInfo = UserService.getUserByEmail(email);
    alert(userInfo);
}

export function submit (email: string, pass: string) {
    
    alert("Email: " + email + ", Password: " + pass );

}

export function checkEmpty(s: string): boolean {
    return isEmpty(s);
}

export function emailCheck(email: string): boolean {
    return checkEmail(email);
}
