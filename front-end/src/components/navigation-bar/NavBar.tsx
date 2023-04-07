import '../../style/Master.css';
import {NavLink, useLocation} from "react-router-dom";

/**
 * Render the navigation bar
 * @returns the navigation bar
 */
export default function NavBar() {

  const location = useLocation(); // for screen navigation
  const pathname = location.pathname; // get props

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

  const checkColor = (title: string) => {
    if(title === pathname){
      return "black";
    }
  }

  const checkBold = (title: string) => {
    if(title === pathname){
      return "bold";
    }
  }

  const checkUnderline = (title: string) => {
    if(title === pathname){
      return "underline";
    }
  }





  return (
    <header className="nav-area">
      <nav>
        <ul className="menus">
          {menuItems.map((menu, index) => {
            return (        
              <li className="menu-items" key={index}>
                <p>
                  <NavLink style={{ color: `${checkColor(menu.url)}`, fontWeight: `${checkBold(menu.url)}`, textDecoration: `${checkUnderline(menu.url)}`}} to={menu.url}>{menu.title}</NavLink>
                </p>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  );

};
