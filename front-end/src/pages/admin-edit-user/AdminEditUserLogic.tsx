/**
 * Checks if server is in list
 * @param userServersList array of servers
 * @param server server we're looking for
 * @returns true if array contains server, false otherwise
 */
export function checkIfServerInList(userServersList: any[], server: string): boolean {
    return userServersList.some(address => {
        if (address.address === server) {
            return true;
        }
        return false;
    });
}