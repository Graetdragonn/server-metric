import { useState } from "react";
import { getAllServers } from "./ServerListLogic";

export default function UserList(){
    const [serverList, setServerList] = useState([] as any[]);
    var servers = new Array();
    
    const getServerList = async () => {
        servers = await getAllServers();
        setServerList(servers);
    }
    getServerList();
    
    return (
    <div >
      <table className="userTable">
      <caption>All Servers</caption>
        <tr>
          <th>Address</th>
        </tr>
        {serverList.map((server) => {
          return (
            <tr key={server.address} className="userRow" >
              <td>{server.address}</td>
            </tr>
          )
        })}
      </table>
    </div>
    );
}