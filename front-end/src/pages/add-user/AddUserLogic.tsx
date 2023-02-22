import UserService from "../../requests/UserService";

export async function getServiceProviderList() {
    const res = await UserService.getUsers();
    var userList = JSON.parse(res);
    var serverProviders = new Array();
    
    for(let i = 0; i < userList.length; i++){
        if(userList[i]["userType"] === "SERVICE_PROVIDER"){
            serverProviders.push(userList[i]);
        }
    }
    return serverProviders;
}