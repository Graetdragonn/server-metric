import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navigation-bar/NavBar";
import UserList from "../../components/user-list/UserList";
import { getAllUsers, getUserInfo } from "../../components/user-list/UserListLogic";
import { getClientList } from "../admin-add-server/AdminAddServerLogic";
import BackButton from "../../components/back-button/BackButton";
import ServerList from "../../components/server-list/ServerList";

/**
 * Render admin single server screen
 * @returns Admin single server page
 */
export default function AdminAllUsersPage() {
    const [userList, setUserList] = useState([] as any[]); // user list to render
    var users = new Array(); // temporary user list variable
    const navigate = useNavigate(); // for screen navigation


    useEffect(() => {
        // get all users for admin
        const getAllUserList = async () => {
            users = await getAllUsers();
            setUserList(users);
        }

        // get all clients for service manager
        const getClients = async () => {
            users = await getClientList();
            setUserList(users);

        }

        if (localStorage.getItem("userType") === "ADMIN") {
            getAllUserList();
        } else if (localStorage.getItem("userType") === "SERVICE_MANAGER") {
            getClients();
        }

    }, [])

    const goToEdit = async (email: string) => {
        var res = await getUserInfo(email);
        navigate('/adminedituser', { state: { userInfo: res } });
    }

    // go to edit client for service manager
    const goToEditSM = async (email: string) => {
        var res = await getUserInfo(email);
        navigate('/spedituser', { state: { userInfo: res } });
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="center" >
                <table className="userTableAdmin">
                    <caption>All Users</caption>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user: any) => {
                            return (
                                <tr key={user.username} className="userRow" onClick={() => goToEdit(user.username)}>
                                    <td>{user.userFirstName}</td>
                                    <td>{user.userLastName}</td>
                                    <td>{user.username}</td>
                                    <td>{user.userType}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
