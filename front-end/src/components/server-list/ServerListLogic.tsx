import ServerService from "../../requests/ServerService";
import UserService from "../../requests/UserService";

// client interface
interface Client {
    username: string;
    password: string;
    userType: string;
    userFirstName: string;
    userLastName: string;
    servers: { address: string }[];
    clients: Client[];
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: boolean;
}

/**
 * Get all servers
 * @returns all servers in database
 */
export async function getAllServers() {
    var res = await ServerService.getAllServers();
    return JSON.parse(res);
}

/**
 * Get server data by address
 * @param server server address
 * @returns server data
 */
export async function getServerInfo(server: string) {
    const res = await ServerService.getServerByAddress(server);
    var serverData = JSON.parse(res);
    return serverData;
}

/**
 * Get user by email
 * @param user email
 * @returns user data
 */
export async function getUserByEmail(email: string) {
    var res = await UserService.getUserByEmail(email);
    var userData = JSON.parse(res);
    return userData;
}

/**
 * Get all clients that belong to a certain service provider
 * @returns all clients in database belonging to a specified service provider
 */
export async function getClientsByProvider(userInfo: Client) {
    var clients = new Array();

    if (userInfo["clients"] != null) {
        userInfo["clients"].forEach((client: Client) => {
            clients.push(client["username"]);
        });
    }

    return clients;
}

/**
 * Get clients' servers
 * @param clients list of service provider's clients
 * @returns list of servers
 */
export async function getClientsServers(clients: string[]) {
    var servers = new Array({ address: String });
    for (let i = 0; i < clients.length; i++) {
        var clientInfo = await getUserByEmail(clients[i]);
        for (let j = 0; j < clientInfo["servers"].length; j++) {
            servers.push(clientInfo["servers"][j]);
        }
    }
    return servers;
}

export function sortServers(servers: any[]) {
    var sorted = new Array();

    for (let i = 0; i < servers.length; i++) {
        var serverAddressSplit = servers[i].address.split('.');
        var firstThree = serverAddressSplit[0] + "." + serverAddressSplit[1] + "." + serverAddressSplit[2];
        var isIn = false;


        // check if we already have a server in that list
        for (var j = 0; j < sorted.length; j++) {
            if (JSON.stringify(sorted[j].firstThree) === JSON.stringify(firstThree)) {
                isIn = true;
                break;
            }
        }
        if (!isIn) {
            sorted.push({ firstThree: firstThree, addresses: [{ address: servers[i].address }] });
        }
        else {
            sorted[j].addresses.push({ address: servers[i].address });
        }


    }
    console.log(sorted);
    return sorted;
}
