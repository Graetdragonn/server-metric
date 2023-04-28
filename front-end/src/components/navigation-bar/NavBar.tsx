import '../../style/Master.css';
import {NavLink, useLocation} from "react-router-dom";
import logo from './logo.png'
import * as Constants from "../../constants";

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
      url: Constants.DASHBOARD_PAGE,
    },
    {
      title: 'Settings',
      url: Constants.SETTINGS_PAGE,
    },
    {
      title: 'Log Out',
      url: Constants.START_PAGE,
    },
  ];

  const checkColor = (title: string) => {
    if(title === pathname){
      return "var(--better_black)";
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
    <header className="nav-area" style={{zIndex:2, width: "110%"}}>
      <img style={{ width: 70, height: 70, paddingLeft: 60}} src={logo} alt="Logo" />
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
      {/*<img style={{ width: 70, height: 70, paddingLeft: 800}} src={logo} alt="Logo" />*/}
    </header>
  );

};
