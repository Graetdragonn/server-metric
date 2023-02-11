import { isEmpty, checkEmail } from "../create-account/CreateAccountLogic";
import UserService from '../../requests/UserService';


export async function getUserInfo(email: string) {
    const userInfo = await UserService.getUserByEmail(email);
    var userData = JSON.parse(userInfo);
    var password = userData['userPassword'];
    var userType = userData['userType'];
    var firstName = userData['userFirstName'];
    var lastName = userData['userLastName'];
    alert(email);
    alert(password);
    alert(userType);
    alert(firstName);
    alert(lastName);
}