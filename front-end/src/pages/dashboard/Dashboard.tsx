import NavBar from "../../components/navigation-bar/NavBar";
import { useNavigate } from 'react-router-dom';
import UserList from '../../components/user-list/UserList';
import ServerList from '../../components/server-list/ServerList';
import NetworkGraph from "../../components/network-graph/NetworkGraph";
import PacketPerIPClient from "../../components/packet-per-ip-graph-client/PacketPerIPClient";
import PacketPerIPSP from "../../components/packet-per-ip-graph-sp/PacketPerIPSP";
import orangeCircle from './icons8-orange-circle-48.png'
import purpleCircle from './icons8-purple-circle-48.png'

/**
 * Render dashboard page for each user type
 * @returns dashboard page depending on user type
 */
export default function DashboardPage() {
  const navigate = useNavigate(); // for screen navigation
  const userType = localStorage.getItem('userType'); // get user's type

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
          <h3 style={{display: "inline-flex", textAlign: "center", marginLeft: "33%",  textDecoration: "underline" }}> Graph of Packets Sent and Received through each Server</h3>
          <PacketPerIPClient></PacketPerIPClient>
          <br />
          <br/>
          <h3 style={{display: "inline-flex", textAlign: "center", marginLeft: "38%",  textDecoration: "underline" }}> Graph of Overall Network Connections</h3>
          <div  style={{backgroundColor: "white", marginLeft: "4%", height: "510px", width: "1410 px", borderColor: "black", borderStyle: "solid"}}>
            <NetworkGraph></NetworkGraph>
          </div>
          <p style = {{display: "inline-flex", textAlign: "center", marginLeft: "39%"}}> <img style={{ width:20, height: 20}} src={orangeCircle} alt="Logo" /> <span style={{color:"var(--orange_wheel"}}>: Local Addresses &nbsp;</span> <img style={{ width:20, height: 20}} src={purpleCircle} alt="Logo" /> <span style={{color:"var(--some_purple"}}>: Global Addresses</span></p>
      </div>

      <div className="white-div" style={{ width: 1400, display: userType !== "SERVICE_PROVIDER" ? 'none' : '' }}>
          <h3 style={{display: "inline-flex", textAlign: "center", marginLeft: "31%",  textDecoration: "underline" }}> Graph of Packets Sent/Received through Different Client Servers</h3>
          <PacketPerIPSP></PacketPerIPSP>
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
