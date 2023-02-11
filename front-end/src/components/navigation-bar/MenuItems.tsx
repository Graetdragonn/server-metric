import React, { useState } from 'react';
import '../../style/Master.css';
import { NavLink} from "react-router-dom";
import Dropdown from './Dropdown';

const MenuItems: React.FunctionComponent<any> = ({ items }) => {

    const [dropdown, setDropdown] = useState(false);
    return (
        <li className="menu-items">
            {items.submenu ? (
                <>
                    <button 
                    type="button" 
                    aria-haspopup="menu" 
                    aria-expanded={dropdown ? "true" : "false"}
                    onClick={() => setDropdown(!dropdown)}
                    className="arrow">
                        {items.title}{' '}
                    </button>
                    <Dropdown submenus={items.submenu} dropdown={dropdown}/>
                </>
            ) : (
                <NavLink to={items.url}>{items.title}</NavLink>
            )}
        </li>
    );
};

export default MenuItems;