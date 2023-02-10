import ServerService from "../../requests/ServerService";

/**
 * Sends JSON request to get all servers
 */
export async function listAllServers() {
    try {
        const res = await ServerService.getAllServers();
        var serverList = JSON.parse(res);
        return ["test", "test2", "test3"];
    }
    catch {
        return [];
    }
}