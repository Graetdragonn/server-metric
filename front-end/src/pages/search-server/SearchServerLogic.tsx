import ServerService from "../../requests/ServerService";

/**
 * Check if server is accessible to user
 * @param server server to look for
 * @param servers server list
 * @returns true if in list, false otherwise
 */
export async function checkServerInList(server: string, servers: any[]) {

    if (localStorage.getItem("userType") === "SERVICE_PROVIDER") {
        for (let i = 0; i < servers.length; i++) {
            for (let j = 0; j < servers[i]["servers"].length; j++) {
                for (let x = 0; x < servers[i]["servers"][j]["addresses"].length; x++) {
                    if (server === servers[i]["servers"][j]["addresses"][x]["address"]) {
                        return true;
                    }
                }
            }
        }
    }
    else {
        for (let i = 0; i < servers.length; i++) {
            if (server === servers[i]['address']) {
                return true;
            }
        }
    }

    return false;
}