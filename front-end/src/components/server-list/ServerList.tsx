import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllServers, getServerInfo, getClientsByProvider, getUserByEmail } from "./ServerListLogic";


export default function ServerList(){
    const [serverList, setServerList] = useState([] as any[]);
    var servers = [] as {address: string}[]; // type is {address: string}[]
    var clients = [] as string[];
    const navigate = useNavigate();
    
    useEffect(() => {
      getServerList();
    }, []);

    // get all servers
    const getServerList = async () => {
      var email = localStorage.getItem("email")!.substring(1, localStorage.getItem("email")!.length - 1);
      if (localStorage.getItem("userType") === "ADMIN") {
        servers = await getAllServers();
      } else {
        if (localStorage.getItem("userType") === "SERVICE_PROVIDER") {
          var userInfo = await getUserByEmail(email);
          clients = await getClientsByProvider(userInfo);
        } else if (localStorage.getItem("userType") === "CLIENT") {
          clients = [email];
        }
        
        // 
        for (let i = 0; i < clients.length; i++) {
          var clientInfo = await getUserByEmail(clients[i]);
          for (let j = 0; j < clientInfo["servers"].length; j++) {
            servers.push(clientInfo["servers"][j]);
          }
        }
      }
      
      // remove duplicates by casting to Set then back to Array
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
        <thead>
          <tr>
            <th>Addresses</th>
          </tr>
        </thead>
        <tbody>
          {serverList.map((server) => {
            return (
              <tr key={server.address} className="userRow" onClick={() => {goToSingleServer(server.address)}}>
                <td>{server.address}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    );
}