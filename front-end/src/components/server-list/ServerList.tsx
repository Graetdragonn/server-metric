import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllServers, getServerInfo, getClientsByProvider, getUserByEmail, getClientsServers, sortServers } from "./ServerListLogic";
import '../../style/Master.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import * as Constants from "../../constants";

/**
 * Render a server list
 * @returns list of all servers for admin, list of client's servers for client, list of their client's servers for service provider
 */
export default function ServerList() {
  const [serverList, setServerList] = useState([] as any[]); // server list to be displayed
  const [currentTime, setCurrentTime] = useState(new Date()) // default value can be anything you want
  let servers = [] as any[]; // server list temp variable
  let clients = [] as string[]; // list of clients for service provider
  const navigate = useNavigate(); // for screen navigation

  // get server list
  useEffect(() => {
    // get all servers
    const getServerList = async () => {
      const email = localStorage.getItem("email")!.substring(1, localStorage.getItem("email")!.length - 1);

      // if user is an admin, then get all servers
      if (localStorage.getItem("userType") === "ADMIN") {
        servers = await getAllServers();
        servers = sortServers(servers);
      }
      else if (localStorage.getItem("userType") === "SERVICE_PROVIDER") {
        const userInfo = await getUserByEmail(email);
        clients = await getClientsByProvider(userInfo);
        // get list of servers
        servers = await getClientsServers(clients);
      } else if (localStorage.getItem("userType") === "CLIENT") {
        clients = [email];
        // get list of servers
        servers = await getClientsServers(clients);
        servers = sortServers(servers);
      }
      // remove duplicates by casting to Set then back to Array
      setServerList(Array.from(new Set(servers)));

    }
    setTimeout(() => setCurrentTime(new Date()), 10000)
    getServerList();

  }, [currentTime]);

  // navigate to single server page
  const goToSingleServer = async (address: string) => {
    const res = await getServerInfo(address);
    if (localStorage.getItem("userType") === "ADMIN") {
      navigate(Constants.ADMIN_SINGLE_SERVER_PAGE, { state: { serverInfo: res } });
    } else {
      navigate(Constants.SINGLE_SERVER_PAGE, { state: res["address"] });
    }
  }

  // if user is service provider, then display client list dropdown
  if (localStorage.getItem("userType") === 'SERVICE_PROVIDER') {
    return (
      <div>
        <h1 className="server-list-header-sp" style={{ fontSize: 18, textDecoration: 'underline' }}>Clients</h1>
        {serverList.map((client) => {
          return (
            <div>
              <Accordion style={{ color: "white", padding: 0 }} elevation={0}>
                <AccordionSummary sx={{ backgroundColor: 'var(--zomp)' }}>
                  <Typography className="server-in-list" style={{ fontWeight: 'bold' }}>{client.firstName} {client.lastName}</Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion" style={{ color: 'white', padding: 0 }}>
                  {client.servers.map((server: any) => {
                    return (
                      <div>
                        <Accordion style={{ backgroundColor: 'lightgrey', padding: 0 }} elevation={0}>
                          <AccordionSummary >
                            <Typography key={server.firstThree} className='server-in-list' style={{ fontWeight: 'bold', color: 'white' }}>{server.firstThree}</Typography>
                          </AccordionSummary>
                          <AccordionDetails className="accordion" style={{ color: 'var(--zomp)', backgroundColor: 'white'}}>
                            {server.addresses.map((address: any) => {
                              return (
                                <Typography key={address.address} onClick={() => { goToSingleServer(address.address) }} className='server-in-list'>{address.address}</Typography>
                              )
                            })}
                          </AccordionDetails>
                        </Accordion>
                      </div>
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
  else if (localStorage.getItem("userType") !== 'SERVICE_MANAGER') {
    return (
      <div>
        <h1 className="server-list-header-client" style={{ fontSize: 18, textDecoration: 'underline'}}>Servers</h1>
        {serverList.map((server) => {
          return (
            <div>
              <Accordion style={{ color: "white", padding: 0 }} elevation={0}>
                <AccordionSummary sx={{ backgroundColor: 'var(--zomp)' }}>
                  <Typography className='server-in-list' style={{ fontWeight: 'bold' }}>{server.firstThree}</Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion" style={{backgroundColor: 'lightgrey', color:'white'}}>
                  {server.addresses.map((address: any) => {
                    return (
                      <Typography key={address.address} onClick={() => { goToSingleServer(address.address) }} className='server-in-list'>{address.address}</Typography>
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
  return null;
}
