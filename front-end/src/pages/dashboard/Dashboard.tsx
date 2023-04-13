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
        if(subnetList.length > 0 ){
            for(let i = 0; i<subnetList.length; i++){
                returning.push(<PacketPerIPClient subnetAddress={subnetList[i]}></PacketPerIPClient>)
            }
            return returning;
        }else{
            return [];
        }
    }

    function renderSPGraphs(clientAndListOfSubnetList: any[]){
        let returning = [];
        if(clientAndListOfSubnetList.length > 0 ){
            for(let i = 0; i<clientAndListOfSubnetList.length; i++){
                for(let j = 0; j<clientAndListOfSubnetList[i]["subnets"].length; j++){
                    returning.push(<PacketPerIPSP clientFullName={clientAndListOfSubnetList[i]["clientName"]} clientEmail={clientAndListOfSubnetList[i]["clientEmail"]} subnetAddress={clientAndListOfSubnetList[i]["subnets"][j]}></PacketPerIPSP>)
                }
            }
            return returning;
        }else{
            return [];
        }
    }

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            // @ts-ignore
            this.classList.toggle("active");
            // @ts-ignore
            var content = this.nextElementSibling;
            if (!content.style.display || content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
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
          <h3 style={{display: "inline-flex", textAlign: "center", marginLeft: "38%",  textDecoration: "underline" }}> Graph of Overall Network Connections</h3>
          <div  style={{backgroundColor: "white", marginLeft: "4%", height: "510px", width: "1410 px", borderColor: "black", borderStyle: "solid"}}>
              <NetworkGraph></NetworkGraph>
          </div>
          <p style = {{display: "inline-flex", textAlign: "center", marginLeft: "39%"}}> <img style={{ width:20, height: 20}} src={orangeCircle} alt="Logo" /> <span style={{color:"var(--orange_wheel"}}>: Local Addresses &nbsp;</span> <img style={{ width:20, height: 20}} src={purpleCircle} alt="Logo" /> <span style={{color:"var(--some_purple"}}>: Global Addresses</span></p>
          <br/>
          <br/>
          <h3 style={{display: "inline-flex", textAlign: "center", marginLeft: "33%",  textDecoration: "underline" }}> Graph of Packets Sent and Received through each Server</h3>
          {renderClientGraphs(clientSubnetListState)}


      </div>

      <div className="white-div" style={{ width: 1400, display: userType !== "SERVICE_PROVIDER" ? 'none' : '' }}>
          <h3 style={{display: "inline-flex", textAlign: "center", marginLeft: "29%",  textDecoration: "underline" }}> Graphs of Packets Sent/Received through Different Client Servers</h3>
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
