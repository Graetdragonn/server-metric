import NavBar from "../../components/navigation-bar/NavBar";
import { useNavigate } from 'react-router-dom';
import UserList from '../../components/user-list/UserList';
import ServerList from '../../components/server-list/ServerList';
import NetworkGraph from "../../components/network-graph/NetworkGraph";
import PacketPerIPClient from "../../components/packet-per-ip-graph-client/PacketPerIPClient";
import PacketPerIPSP from "../../components/packet-per-ip-graph-sp/PacketPerIPSP";
import {getClientAndSubnetServersByUser, getSubnetServersByUser} from "./DashboardLogic";
import {useEffect, useState} from "react";
import * as Constants from "../../constants";
import TimeGraph from "../../components/time-graph/TimeGraph";
import Collapsible from "react-collapsible";
/**
 * Render dashboard page for each user type
 * @returns dashboard page depending on user type
 */
export default function DashboardPage() {
    const navigate = useNavigate(); // for screen navigation
    const userType = localStorage.getItem('userType'); // get user's type
    const [clientSubnetListState, setClientSubnetListState] = useState([] as any[]);
    const [spClientAndSubnetListState, setSPClientAndSubnetListState] = useState([] as any[]);
    const [currentTime, setCurrentTime] = useState(new Date()) // default value can be anything you want
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
        setTimeout(() => setCurrentTime(new Date()), 10000)
        getData()

    }, [currentTime])

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

    function renderTimeGraphs(subnetList: string[]){
        let returning = [];
        for(let i = 0; i<subnetList.length; i++){
            returning.push(<TimeGraph subnetAddress={subnetList[i]}></TimeGraph>)
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
          <button className="server-list-button" style={{ display: userType === "CLIENT" ? '' : 'none' }} onClick={() => navigate(Constants.ADD_SERVER_PAGE)}>Add Server</button>
          <button className="server-list-button" style={{ display: userType === "CLIENT" ? '' : 'none' }} onClick={() => navigate(Constants.REMOVE_SERVER_PAGE)}>Remove Server</button>
            <br/>
            <br/>
          <ServerList />
        </div>
      </div>
      <br />
        
      <div className="white-div" style={{ width: 1500, display: userType !== "CLIENT" ? 'none' : '' }}>
          <NetworkGraph></NetworkGraph>

          <br/>
          <br/>

          <div className={"div-for-collapsible"}>
              <br/>
              <h2 style={{textAlign: "center"}}>Time Graphs for each Subnet</h2>
                  <br/>
                  {renderTimeGraphs(clientSubnetListState)}
              <br/>
          </div>

          <br/>
          <br/>

          <div className={"div-for-collapsible"}>
              <br/>
              <h2 style={{textAlign: "center"}}> Total Packets Graphs for each Subnet</h2>
              <br/>
          {renderClientGraphs(clientSubnetListState)}
              <br/>
          </div>

      </div>

      <div className="white-div" style={{ width: 1500, display: userType !== "SERVICE_PROVIDER" ? 'none' : '' }}>
         <div className={"div-for-collapsible"}>
             <br/>
             <h2 style={{textAlign: "center"}}>Total Packet Graphs for each Client Server</h2>
             <br/>
             {renderSPGraphs(spClientAndSubnetListState)}
             <br/>
         </div>
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
            <button style={{ width: 150 }} onClick={() => navigate(Constants.ADD_USER_PAGE)}>Add User</button>
            <button style={{ width: 150 }} onClick={() => navigate(Constants.DELETE_USER_PAGE)}>Delete User</button>
            <button style={{ width: 150 }} onClick={() => navigate(Constants.ADMIN_ADD_SERVER_PAGE)}>Add Server</button>
            <button style={{ width: 150 }} onClick={() => navigate(Constants.ADMIN_DELETE_SERVER_PAGE)}>Delete Server</button>
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
