import { useEffect, useState } from 'react';
import '../../style/Master.css';
import { getServersByUser } from './NavBarLogic';
import MenuItems from './MenuItems';

const NavBar = () => {

  // list of server ip addresses
  const [serverListObj, setServerListObj] = useState([] as ({ title: string; url: string;}[]));

  // get data to render on screen immediately (specifically list of servers for dropdown)
  useEffect(() => {
    var serverList = [] as string[];
    const getServerList = async () => {
      const email = JSON.parse(localStorage.getItem('email') || '');
      serverList = await getServersByUser(email);
      serverList.forEach((item) => {
        handleAddNewServer(item);
      });
    };
    getServerList();    
  }, []);

  // handler for adding a new server ip address to the list
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
