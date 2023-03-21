import { useState } from "react";
import { getAllUsers, getUserInfo, getClientList } from "../user-list/UserListLogic";
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
    getClients();

    // go to edit client
    const goToEdit = async (email: string) => {
        var res = await getUserInfo(email);
        navigate('/adminedituser', { state: { userInfo: res } });
    }

    return (
        <div >
            <table className="userTable">
                <caption>All Clients</caption>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                </tr>
                {userList.map((user) => {
                    return (
                        <tr key={user.username} className="userRow" onClick={() => goToEdit(user.username)}>
                            <td>{user.userFirstName}</td>
                            <td>{user.userLastName}</td>
                            <td>{user.username}</td>
                            <td>{user.userType}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}