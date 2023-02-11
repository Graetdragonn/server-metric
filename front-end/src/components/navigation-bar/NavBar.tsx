import React, { useEffect, useState } from 'react';
import '../../style/Master.css';
import { useNavigate, NavLink} from "react-router-dom";
import { getListOfServers } from './NavBarLogic';
import MenuItems from './MenuItems';

const NavBar = () => {

  const [serverListObj, setServerListObj] = useState([] as ({ title: string; url: string;}[]));

  useEffect(() => {
    var serverList = [] as string[];
    const getServerList = async () => {
      serverList = await getListOfServers();
      serverList.forEach((item) => {
        handleAddNewServer(item);
      });
    };
    getServerList();    
  }, []);

  const handleAddNewServer = (address: string) => {
    setServerListObj(previousList => ([...previousList, {title: address, url: '/single-server'}]));
  };

  // ideally, put this somewhere else like in a global file then import
  const menuItems = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Servers',
      url: '/single-server',
      submenu: true,
    },
    {
      title: 'Settings',
      url: '/settings',
    },
    {
      title: 'Log Out',
      url: '/',
    },
  ];

  return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} serverList={serverListObj}/>
        })}
      </ul>
    </nav>
  );

};

export default NavBar;



// const NavBar = () => {

//   // how to just get info without needing to do something???

//   const dropdownItems = [
//     {
//       address: '123'
//     }, 
//     {
//       address: '456'
//     },
//     {
//       address: '789'
//     }
//   ];

//   var serverList: string[] = [];

//   // list of all servers
//   const handleListClick = async () => {
//      serverList = await listAllServers();
//   };
  
//   // stores server id that user selects from dropdown
//   const [selectedServer, setSelectedServer] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleChange = (e: { target: { name: string; }; }) => {
//     setSelectedServer(e.target.name);
//   };

//   const handleDropdownClick = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <div className='navbar-wrapper'>
//       <NavLink 
//         to="/dashboard"
//         className={({ isActive }) =>
//           isActive ? 'active-navbar-item navbar-item' : 'navbar-item'
//         } 
//       >
//         Dashboard
//       </NavLink>
      
// {/* attempt at dropdown using onClick handler */}
//       <div className="navbar-item" onClick={handleDropdownClick}>Servers</div>
//       <div className={`dropdown-items ${showDropdown ? 'show' : ''}`}>
//         {dropdownItems.map((item, index) => (
//           <NavLink key={index} to="/single-server" state={item}>{item.address}</NavLink>
//         ))}
//       </div>

// {/* attempt at dropdown using basic select/option html */}
//       {/* <div className="navbar-item" aria-haspopup="menu">Servers</div>
//       <select className="dropdown">
//         <option selected={true} disabled={true}></option>
//         {dropdownItems.map((item) =>(
//           <option>
//             <NavLink to="/single-server">{item.address}</NavLink>
//           </option>
//         ))}
//       </select> */}

// {/* no dropdown attempt */}
// {/*   <NavLink 
//         to="/single-server"
//         className={({ isActive }) =>
//           isActive ? 'active-navbar-item navbar-item' : 'navbar-item'
//         } 
//       >
//         Servers
//       </NavLink> */}

//       <NavLink 
//         to="/settings"
//         className={({ isActive }) =>
//           isActive ? 'active-navbar-item navbar-item' : 'navbar-item'
//         } 
//       >
//         Settings
//       </NavLink>
//       <NavLink 
//         to="/"
//         className={({ isActive }) =>
//           isActive ? 'active-navbar-item navbar-item' : 'navbar-item'
//         } 
//       >
//         Sign Out
//       </NavLink>
//     </div>
//   );
// }
  
// export default NavBar;