import { useState } from "react";
import { getClientList } from "./ClientListLogic";
import { getUserInfo } from "../user-list/UserListLogic";
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";

export default function UserList() {
    const [userList, setUserList] = useState([] as any[]);
    var users = new Array();
    const navigate = useNavigate();

    // get clients
    const getClients = async () => {
        users = await getClientList();
        setUserList(users);
    }
    if (localStorage.getItem("userType") === "SERVICE_MANAGER") {
        getClients();
    }

    // go to edit client
    const goToEdit = async (email: string) => {
        var res = await getUserInfo(email);
        navigate('/spedituser', { state: { userInfo: res } });
    }

    return (
        <div >
            <table className="userTable">
                <caption>All Clients</caption>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Service Provider</th>
                </tr>
                {userList.map((user) => {
                    return (
                        <tr key={user.client.username} className="userRow" onClick={() => goToEdit(user.client.username)}>
                            <td>{user.client.userFirstName}</td>
                            <td>{user.client.userLastName}</td>
                            <td>{user.client.username}</td>
                            <td>{user.serviceProvider}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}