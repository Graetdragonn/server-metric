import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllServers, getServerInfo } from "./ServerListLogic";

export default function UserList(){
    const [serverList, setServerList] = useState([] as any[]);
    var servers = new Array();
    const navigate = useNavigate();
    
    const getServerList = async () => {
        servers = await getAllServers();
        setServerList(servers);
    }
    getServerList();

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