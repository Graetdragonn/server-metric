import ServerService from "../../requests/ServerService";

export async function deleteServer(address: string) {
    var res = await ServerService.deleteFromServerList(address);
    if (res === "ERROR") {
        return false;
    }
    else {
        return true;
    }
}