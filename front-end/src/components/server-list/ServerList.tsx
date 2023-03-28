import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllServers, getServerInfo, getClientsByProvider, getUserByEmail, getClientsServers } from "./ServerListLogic";

/**
 * Render a server list
 * @returns list of all servers for admin, list of client's servers for client, list of their client's servers for service provider
 */
export default function ServerList() {
  const [serverList, setServerList] = useState([] as any[]); // server list to be displayed
  var servers = [] as any[]; // server list temp variable
  var clients = [] as string[]; // list of clients for service provider
  const navigate = useNavigate(); // for screen navigation

  useEffect(() => {
    getServerList();
  }, []);

  // get all servers
  const getServerList = async () => {
    var email = localStorage.getItem("email")!.substring(1, localStorage.getItem("email")!.length - 1);

    // if user is an admin, then get all servers
    if (localStorage.getItem("userType") === "ADMIN") {
      servers = await getAllServers();
    } else {
      if (localStorage.getItem("userType") === "SERVICE_PROVIDER") {
        var userInfo = await getUserByEmail(email);
        clients = await getClientsByProvider(userInfo);
      } else if (localStorage.getItem("userType") === "CLIENT") {
        clients = [email];
      }
      // get list of servers
      servers = await getClientsServers(clients);
    }

    // remove duplicates by casting to Set then back to Array
    setServerList(Array.from(new Set(servers)));
  }

  // navigate to single server page
  const goToSingleServer = async (address: string) => {
    var res = await getServerInfo(address);
    if (localStorage.getItem("userType") === "ADMIN") {
      navigate('/adminsingleserver', { state: { serverInfo: res } });
    } else {
      navigate('/single-server', { state: res["address"] });
    }
  }

  return (
    <div >
      <ul className="server-list">
      <h1 style={{fontSize: 18, textDecoration: 'underline'}}>Servers</h1>
        {serverList.map((server) => {
          return (
            <li className='server-in-list' key={server.address} onClick={() => { goToSingleServer(server.address) }}>
              <p>
                {server.address}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
