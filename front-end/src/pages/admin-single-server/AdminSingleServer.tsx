import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/navigation-bar/Header";
import { addServerToUser } from "../add-server/AddServerLogic";
import { checkEmail } from "../create-account/CreateAccountLogic";
import { getUsersOnServer, removeServerFromUser } from "./AdminSingleServerLogic";

const AdminSingleServerPage = () => {
    const { state } = useLocation();
    const { serverInfo } = state;

    const [userList, setUserList] = useState([] as any[]);
    var users = new Array();

    const [userToAddOrDelete, setUserToAddOrDelete] = useState("");
    const [addUserError, setAddUserError] = useState(false);
    const [emailFormatError, setEmailFormatError] = useState(false);
    const [deleteUserError, setDeleteUserError] = useState(false);

    const getUserList = async () => {
        users = await getUsersOnServer(serverInfo.address);
        setUserList(users);
    }
    getUserList();

    // to update user information when user inputs data
    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        setUserToAddOrDelete(e.target.value);
    };

    /**
     * Handle add user to server
     */
    const addUserToServer = async () => {
        setAddUserError(false);
        setDeleteUserError(false);
        setEmailFormatError(false);
        if (!checkEmail(userToAddOrDelete)) {
            setEmailFormatError(true);
        }
        else if (await addServerToUser(userToAddOrDelete, serverInfo.address)) {
            getUserList();
        }
        else {
            setAddUserError(true);
        }
    };

    /**
     * Handle delete user from server
     */
    const deleteUserFromServer = async () => {
        setAddUserError(false);
        setDeleteUserError(false);
        setEmailFormatError(false);
        if (!checkEmail(userToAddOrDelete)) {
            setEmailFormatError(true);
        }
        else if (await removeServerFromUser(userToAddOrDelete, serverInfo.address)) {
            getUserList();
        }
        else {
            setDeleteUserError(true);
        }
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
            <div className="center" style={{textAlign: "center"}}>
                <input type='text' style={{ width: 350, margin: 'auto' }} placeholder="User Email Address" value={userToAddOrDelete} onChange={handleChange}></input>
                <br></br>
                <p className='error' style={{display: emailFormatError ? '' : 'none', margin:'auto'}}>Please enter a valid email address</p>
                <p className='error' style={{display: addUserError ? '' : 'none', margin:'auto'}}>Unable to add server to user</p>
                <p className='error' style={{display: deleteUserError ? '' : 'none', margin:'auto'}}>Unable to remove server from user</p>
            </div>
            <div className='center' style={{ textAlign: 'center'}} >
                <button type="button" className="addServerButton" style={{ margin: 'auto', display: 'inline-block', textAlign: 'center' }} onClick={addUserToServer}>Add</button>
                <button type="button" className="addServerButton" style={{ margin: 'auto', display: 'inline-block', textAlign: 'center' }} onClick={deleteUserFromServer}>Delete</button>
            </div>

        </div>
    );
}

export default AdminSingleServerPage;