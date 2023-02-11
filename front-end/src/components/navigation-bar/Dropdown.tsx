import '../../style/Master.css';
import { NavLink} from "react-router-dom";

interface Props {
    submenu: Array<{title: string, url: string}>;
    dropdown: boolean;
    serverList: {title: string, url: string}[];
}

const Dropdown: React.FunctionComponent<Props> = ({ submenu, dropdown, serverList }) => {
    return (
        <ul className={`dropdown ${dropdown ? "show" : ""}`}>
            {serverList.map((submenu, index) => (
                <li key={index} className="menu-items">
                    <NavLink to={submenu.url} state={submenu.title}>{submenu.title}</NavLink>
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;