import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate, NavLink} from "react-router-dom";
import { listAllServers } from './NavBarLogic';


const NavBar = () => {

  // how to just get info without needing to do something???

  var serverList: string[] = [];

  // list of all servers
  const handleListClick = async () => {
     serverList = await listAllServers();
  };
  
  // stores server id that user selects from dropdown
  const [selectedServer, setSelectedServer] = useState("");

  const handleChange = (e: { target: { name: string; }; }) => {
    setSelectedServer(e.target.name);
  };

  return (
    <div className='navbar-wrapper'>
      <NavLink 
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? 'active-navbar-item navbar-item' : 'navbar-item'
        } 
      >
        Dashboard
      </NavLink>
      <NavLink 
        to="/single-server"
        className={({ isActive }) =>
          isActive ? 'active-navbar-item navbar-item' : 'navbar-item'
        } 
      >
        Servers
      </NavLink>
      <NavLink 
        to="/settings"
        className={({ isActive }) =>
          isActive ? 'active-navbar-item navbar-item' : 'navbar-item'
        } 
      >
        Settings
      </NavLink>
      <NavLink 
        to="/"
        className={({ isActive }) =>
          isActive ? 'active-navbar-item navbar-item' : 'navbar-item'
        } 
      >
        Sign Out
      </NavLink>
    </div>
  );
}
  
export default NavBar;