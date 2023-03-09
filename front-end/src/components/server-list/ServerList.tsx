import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllServers, getServerInfo, getClientsByProvider } from "./ServerListLogic";

export default function UserList(){
    const [serverList, setServerList] = useState([] as any[]);
    var servers = new Array();
    var clients = new Array();
    const navigate = useNavigate();
    
    useEffect(() => {
      getServerList();
    }, []);

    // get all servers
    const getServerList = async () => {
      if (localStorage.getItem("userType") === "ADMIN") {
        servers = await getAllServers();
      // } else {
      //   if (localStorage.getItem("userType") === "SERVICE_PROVIDER") {
      //     clients = await getClientsByProvider(localStorage.getItem("email")!);
      //   } else if (localStorage.getItem("userType") === "CLIENT") {
      //     clients = [localStorage.getItem("email")];
      //   }
      //   clients.forEach((client) => {
      //     // call logic function that gets list of servers for each client
      //     // add list to existing list (may need to call setServerList with the . . . to append)
      //     // hopefully they will make an endpoint for getting all servers that a client owns
      //   });
      //   // THIS WILL NEED TESTED
      //   // test with multiple clients and clients that have multiple servers. make sure all servers are properly listed
      // }
      }
      setServerList(servers);
    }

    const goToSingleServer = async (address: string) => {
        var res = await getServerInfo(address);
        navigate('/adminsingleserver', { state: { serverInfo: res } });
    }
    
    return (
    <div >
      <table className="userTable">
      <caption>All Servers</caption>
        <tr>
          <th>Addresses</th>
        </tr>
        {serverList.map((server) => {
          return (
            <tr key={server.address} className="userRow" onClick={() => {goToSingleServer(server.address)}}>
              <td>{server.address}</td>
            </tr>
          )
        })}
      </table>
    </div>
    );
}