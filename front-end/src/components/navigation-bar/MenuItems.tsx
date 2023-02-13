import React, { useState } from 'react';
import '../../style/Master.css';
import { NavLink } from "react-router-dom";
import Dropdown from './Dropdown';


interface Props {
    items: any;
    serverList: {title: string, url: string}[];
}

const MenuItems: React.FunctionComponent<Props> = ({ items, serverList }) => {

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
                    <Dropdown submenu={items.submenu} dropdown={dropdown} serverList={serverList}/>
                </>
            ) : (
                <NavLink to={items.url}>{items.title}</NavLink>
            )}
        </li>
    );
};

export default MenuItems;