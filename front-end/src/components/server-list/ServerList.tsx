import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllServers, getServerInfo, getClientsByProvider, getUserByEmail } from "./ServerListLogic";


export default function UserList(){
    const [serverList, setServerList] = useState([] as any[]);
    var servers = new Array(); // type is {address: string}[]
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
          // PROBLEM IS HERE... not waiting for getUserByEmail to finish?
          // userInfo is null, i think code should suspend until getUserByEmail is finished
          // and actually returns something but for some reason null is being passed to
          // getClientsByProvider... idk man this is so frustrating
          var userInfo = await getUserByEmail(localStorage.getItem("email")!);
          clients = await getClientsByProvider(userInfo);
        } else if (localStorage.getItem("userType") === "CLIENT") {
          clients = [localStorage.getItem("email")];
        }
        // for each client (or if client, for self), add servers to list
        clients.forEach(async (clientEmail: string) => {
          var userInfo = await getUserByEmail(clientEmail);
          servers.push(userInfo["servers"]);
        });
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
    
    getServerList();

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