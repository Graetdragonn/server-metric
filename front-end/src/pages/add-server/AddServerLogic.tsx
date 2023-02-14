import ServerService from '../../requests/ServerService';
import UserService from '../../requests/UserService';

export function checkServerFormat(server: string): boolean {
    let re = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (re.test(server)) {
        return true;
    }
    return false;
}

export async function checkIfExists(server: string): Promise<boolean> {
    var getServer = await ServerService.getServerByAddress(server);
    if(getServer === 'null'){
        return false; 
    }
    return true;
}

export async function addServerToList(server: string): Promise<boolean> {
    var addServer = await ServerService.addToServerList(server);
    if(addServer === ''){
        return false; 
    }
    return true;
}

export async function addServerToUser(email: string, server: string): Promise<boolean> {
    var addServer = await UserService.addServerToUser(email, server);
    if(addServer === ''){
        return false; 
    }
    return true;
}
