import '../../style/Master.css';
import { NavLink } from "react-router-dom";

/**
 * Render the navigation bar
 * @returns the navigation bar
 */
const NavBar = () => {

  // navigation bar items and their corresponding routes
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
    <header className="nav-area">
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
    </header>
  );

};

export default NavBar;
