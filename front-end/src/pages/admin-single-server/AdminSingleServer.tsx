import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/navigation-bar/Header";
import { getUsersOnServer } from "./AdminSingleServerLogic";

const AdminSingleServerPage = () => {
    const { state } = useLocation();
    const { serverInfo } = state;

    const [userList, setUserList] = useState([] as any[]);
    var users = new Array();

    const [userToAddOrDelete, setUserToAddOrDelete] = useState("");

    const getUserList = async () => {
        users = await getUsersOnServer(serverInfo.address);
        setUserList(users);
    }
    getUserList();

    // to update user information when user inputs data
    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        setUserToAddOrDelete(e.target.value);
    };

    return (
        <div className="Single-Server-Page">
            <Header />
            <p className="title" style={{ fontSize: 40 }}>Address {serverInfo.address} Info</p>

            <div className='center'>
                <table className="userTable" style={{ margin: 'auto', boxShadow: 'none', left: 'auto' }}>
                    <caption>Users Watching</caption>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>User Type</th>
                    </tr>
                    {userList.map((user) => {
                        return (
                            <tr key={user.userEmail} className="userRow" onClick={() => setUserToAddOrDelete(user.userEmail)}>
                                <td>{user.userFirstName}</td>
                                <td>{user.userLastName}</td>
                                <td>{user.userEmail}</td>
                                <td>{user.userType}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <br></br>
            <div className="center" >
                <input type='text' style={{ width: 350, margin: 'auto' }} value={userToAddOrDelete} onChange={handleChange}></input>
            </div>
            <div className='center' style={{ textAlign: 'center' }} >
                <button type="button" className="addServerButton" style={{ margin: 'auto', display: 'inline-block', textAlign: 'center' }}>Add</button>
                <button type="button" className="addServerButton" style={{ margin: 'auto', display: 'inline-block', textAlign: 'center' }}>Delete</button>
            </div>

        </div>
    );
}

export default AdminSingleServerPage;