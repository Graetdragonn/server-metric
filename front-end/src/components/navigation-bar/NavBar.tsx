import '../../style/Master.css';
import { NavLink } from "react-router-dom";

const NavBar = () => {

  // ideally, put this somewhere else like in a global file then import
  const menuItems = [
    {
      title: 'Dashboard',
      url: '/dashboard',
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
          return (        
            <li className="menu-items" key={index}>
              <p>
                <NavLink to={menu.url}>{menu.title}</NavLink>
              </p>
            </li>
          )
        })}
      </ul>
    </nav>
  );

};

export default NavBar;
