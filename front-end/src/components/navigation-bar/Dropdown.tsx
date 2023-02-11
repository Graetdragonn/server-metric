import '../../style/Master.css';
import { NavLink} from "react-router-dom";

interface Props {
    submenus: Array<{title: string, url: string}>;
    dropdown: boolean;
}

const Dropdown: React.FunctionComponent<Props> = ({ submenus, dropdown }) => {
    return (
        <ul className={`dropdown ${dropdown ? "show" : ""}`}>
            {submenus.map((submenu, index) => (
                <li key={index} className="menu-items">
                    <NavLink to={submenu.url} state={submenu.title}>{submenu.title}</NavLink>
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;