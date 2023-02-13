import React, { useState } from 'react';
import '../../style/Master.css';
import { NavLink, useLocation } from "react-router-dom";
import Dropdown from './Dropdown';


interface Props {
    items: any;
    serverList: {title: string, url: string}[];
}

const MenuItems: React.FunctionComponent<Props> = ({ items, serverList }) => {

    const [dropdown, setDropdown] = useState(false);
    const loc = useLocation();

    return (
        <li className="menu-items">
            {items.submenu ? (
                <>
                    <p 
                    aria-haspopup="menu" 
                    aria-expanded={dropdown ? "true" : "false"}
                    onClick={() => setDropdown(!dropdown)}
                    className="arrow menu-item">
                        {items.title}{' '}
                    </p>
                    <Dropdown submenu={items.submenu} dropdown={dropdown} serverList={serverList}/>
                </>
            ) : (
                <p className='menu-item'>
                    <NavLink to={items.url}>{items.title}</NavLink>
                </p>
            )}
        </li>
    );
};

export default MenuItems;