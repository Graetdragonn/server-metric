import ServerService from "../../requests/ServerService";

/**
 * To delete a server globally
 * @param address server to delete
 * @returns true on success, false otherwise
 */
export async function deleteServer(address: string) {
    var res = await ServerService.deleteFromServerList(address);
    if (res === "ERROR") {
        return false;
    }
    else {
        return true;
    }
}