import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllServers, getServerInfo, getClientsByProvider, getServersByClient } from "./ServerListLogic";

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
      } else {
        if (localStorage.getItem("userType") === "SERVICE_PROVIDER") {
          clients = await getClientsByProvider(localStorage.getItem("email")!);
        } else if (localStorage.getItem("userType") === "CLIENT") {
          clients = [localStorage.getItem("email")];
        }
        clients.forEach(async (clientEmail: string) => {
          var clientServers = await getServersByClient(clientEmail);
          servers.push(clientServers);
        });
      }
      
      // casting to Set then back to Array removes duplicates
      setServerList(Array.from(new Set(servers)));
    }

    const goToSingleServer = async (address: string) => {
        var res = await getServerInfo(address);
        if (localStorage.getItem("userType") === "ADMIN") {
          navigate('/adminsingleserver', { state: { serverInfo: res } });
        } else {
          navigate('/singleserver', { state: { serverInfo: res } });
        }
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