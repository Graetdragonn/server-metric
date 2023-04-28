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
    const res = await ServerService.getAllServers();
    return JSON.parse(res);
}

/**
 * Get server data by address
 * @param server server address
 * @returns server data
 */
export async function getServerInfo(server: string) {
    const res = await ServerService.getServerByAddress(server);
    return JSON.parse(res);
}

/**
 * Get user by email
 * @returns user data
 * @param email
 */
export async function getUserByEmail(email: string) {
    const res = await UserService.getUserByEmail(email);
    return JSON.parse(res);
}

/**
 * Get all clients that belong to a certain service provider
 * @returns all clients in database belonging to a specified service provider
 */
export async function getClientsByProvider(userInfo: Client) {
    let clients: any[];
    clients = [];

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
    let clientInfo;
    let servers;
    if (localStorage.getItem("userType") === "CLIENT") {
        servers = new Array({ address: String });
        for (let i = 0; i < clients.length; i++) {
            clientInfo = await getUserByEmail(clients[i]);
            for (let j = 0; j < clientInfo["servers"].length; j++) {
                servers.push(clientInfo["servers"][j]);
            }
        }
        return servers;
    }
    else {
        const serverWithClient = [];
        for (let i = 0; i < clients.length; i++) {
            servers = new Array({address: String});
            clientInfo = await getUserByEmail(clients[i]);
            for (let j = 0; j < clientInfo["servers"].length; j++) {
                servers.push(clientInfo["servers"][j]);
            }
            if (servers.length > 1) {
                servers = sortServers(servers);
                serverWithClient.push({firstName: clientInfo["userFirstName"], lastName: clientInfo["userLastName"], servers: servers})
            }           
        }
        return serverWithClient;
    }
}

export function sortServers(servers: any[]) {
    const sorted = [];

    if (localStorage.getItem("userType") !== "ADMIN") {
        servers = servers.slice(1);
    }
    
    for (let i = 0; i < servers.length; i++) {
        let j;
        const serverAddressSplit = servers[i].address.split('.');
        const firstThree = serverAddressSplit[0] + "." + serverAddressSplit[1] + "." + serverAddressSplit[2];
        let isIn = false;

        // check if we already have a server in that list
        for (j = 0; j < sorted.length; j++) {
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
    return sorted;
}
