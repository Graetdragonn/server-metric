import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllServers, getServerInfo, getClientsByProvider, getUserByEmail, getClientsServers, sortServers } from "./ServerListLogic";
import '../../style/Master.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

/**
 * Render a server list
 * @returns list of all servers for admin, list of client's servers for client, list of their client's servers for service provider
 */
export default function ServerList() {
  const [serverList, setServerList] = useState([] as any[]); // server list to be displayed
  var servers = [] as any[]; // server list temp variable
  var clients = [] as string[]; // list of clients for service provider
  const navigate = useNavigate(); // for screen navigation

  // get server list
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
    servers = sortServers(servers);

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
    <div>
      <h1 className = "server-list" style={{ fontSize: 18, textDecoration: 'underline' }}>Servers</h1>
      {serverList.map((server) => {
        return (
          <div>
            <Accordion style={{color: "white", padding: 0}} elevation={0}>
              <AccordionSummary sx={{backgroundColor: 'var(--zomp)'}}>
              <Typography className='server-in-list' style={{fontWeight:'bold'}}>{server.firstThree}</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordion">
                {server.addresses.map((address: any) => {
                  return (
                    <Typography onClick={() => { goToSingleServer(address.address) }} className='server-in-list'>{address.address}</Typography>
                  )
                })}
              </AccordionDetails>
            </Accordion>
          </div>
        )
      })}
    </div>
  );
}
