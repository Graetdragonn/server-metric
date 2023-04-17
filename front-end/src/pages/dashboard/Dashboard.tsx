import NavBar from "../../components/navigation-bar/NavBar";
import { useNavigate } from 'react-router-dom';
import UserList from '../../components/user-list/UserList';
import ServerList from '../../components/server-list/ServerList';
import NetworkGraph from "../../components/network-graph/NetworkGraph";
import PacketPerIPClient from "../../components/packet-per-ip-graph-client/PacketPerIPClient";
import PacketPerIPSP from "../../components/packet-per-ip-graph-sp/PacketPerIPSP";
import orangeCircle from './icons8-orange-circle-48.png'
import purpleCircle from './icons8-purple-circle-48.png'
import {getClientAndSubnetServersByUser, getSubnetServersByUser} from "./DashboardLogic";
import {useEffect, useState} from "react";

/**
 * Render dashboard page for each user type
 * @returns dashboard page depending on user type
 */
export default function DashboardPage() {
    const navigate = useNavigate(); // for screen navigation
    const userType = localStorage.getItem('userType'); // get user's type
    const [clientSubnetListState, setClientSubnetListState] = useState([] as any[]);
    const [spClientAndSubnetListState, setSPClientAndSubnetListState] = useState([] as any[]);
    let clientSubnetServers: string[]
    let clientAndSubnetList: any[]

    useEffect(() => {
        async function getData() {
            const email = localStorage.getItem("email")!.substring(1, localStorage.getItem("email")!.length - 1);
            clientSubnetServers = await getSubnetServersByUser(email)
            setClientSubnetListState(clientSubnetServers);
            clientAndSubnetList = await getClientAndSubnetServersByUser(email)
            setSPClientAndSubnetListState(clientAndSubnetList)
        }
        getData()
    }, [])

    function renderClientGraphs(subnetList: string[]){
        let returning = [];
            for(let i = 0; i<subnetList.length; i++){
                returning.push(<PacketPerIPClient subnetAddress={subnetList[i]}></PacketPerIPClient>)
            }
        return returning;
    }

    function renderSPGraphs(clientAndListOfSubnetList: any[]){
        let returning = [];
            for(let i = 0; i<clientAndListOfSubnetList.length; i++){
                for(let j = 0; j<clientAndListOfSubnetList[i]["subnets"].length; j++){
                    returning.push(<PacketPerIPSP clientFullName={clientAndListOfSubnetList[i]["clientName"]} clientEmail={clientAndListOfSubnetList[i]["clientEmail"]} subnetAddress={clientAndListOfSubnetList[i]["subnets"][j]}></PacketPerIPSP>)
                }
            }
            return returning;
    }



    return (
    <div className="Dashboard-Page">
      <NavBar />
        <br/>
        <br/>
      {/* CLIENT AND SERVICE PROVIDER DASHBOARD VIEW */}
      <div style={{ display: userType === "CLIENT" || userType === "SERVICE_PROVIDER" ? '' : 'none' }}>
        <br />
        <div className='side-menu'>
          <button className="server-list-button" style={{ display: userType === "CLIENT" ? '' : 'none' }} onClick={() => navigate('/addserver')}>Add Server</button>
          <button className="server-list-button" style={{ display: userType === "CLIENT" ? '' : 'none' }} onClick={() => navigate('/removeserver')}>Remove Server</button>
            <br/>
            <br/>
          <ServerList />
        </div>
      </div>
      <br />

      <div className="white-div" style={{ width: 1400, display: userType !== "CLIENT" ? 'none' : '' }}>
          <NetworkGraph></NetworkGraph>
          <br/>
          <br/>
          <h3 style={{textAlign: "center", marginLeft: "60px",  textDecoration: "underline" }}> Graph of Packets Sent and Received through each Server</h3>
          {renderClientGraphs(clientSubnetListState)}
      </div>

      <div className="white-div" style={{ width: 1400, display: userType !== "SERVICE_PROVIDER" ? 'none' : '' }}>
          <h3 style={{textAlign: "center", marginLeft: "50px",  textDecoration: "underline" }}>Graphs of Packets Sent/Received through Different Client Servers</h3>
          {renderSPGraphs(spClientAndSubnetListState)}
          <br />
      </div>



      {/* ADMIN DASHBOARD VIEW */}
      <div style={{ display: userType !== "ADMIN" ? 'none' : '' }}>
        <br />
        <div className='white-div'>
          <div className='side-menu'>
            <ServerList />
          </div>
          <div className='div-for-admin-services'>
            <h1>Admin Services</h1>
            <button style={{ width: 150 }} onClick={() => navigate('/adduser')}>Add User</button>
            <button style={{ width: 150 }} onClick={() => navigate('/deleteuser')}>Delete User</button>
            <button style={{ width: 150 }} onClick={() => navigate('/adminaddserver')}>Add Server</button>
            <button style={{ width: 150 }} onClick={() => navigate('/admindeleteserver')}>Delete Server</button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <UserList />
          </div>
          <br />

        </div>
        <br />
      </div>

      {/* SERVICE MANAGER DASHBOARD VIEW */}
      <div style={{ display: userType === "SERVICE_MANAGER" ? '' : 'none' }}>
        <br />
        <div style={{ marginTop: '50px' }} />
        <div className='row' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <UserList />
        </div>
        <br />
      </div>

    </div>
  );
};
