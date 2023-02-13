import NavBar from "./NavBar";

/* 
 * Code for NavBar was modified from https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
 * Order of components: Header -> NavBar -> MenuItems -> Dropdown
 */
const Header = () => {
    return (
        <header className="nav-area">
            <NavBar />
        </header>
    );
};

export default Header;