import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/navigation-bar/Header";
import { addServerToUser } from "../add-server/AddServerLogic";
import { checkEmail } from "../create-account/CreateAccountLogic";
import { getUsersOnServer, removeServerFromUser } from "./AdminSingleServerLogic";
import BackButton from "../../components/back-button/BackButton";

/**
 * Render admin single server screen
 * @returns Admin single server page
 */
const AdminSingleServerPage = () => {
    const { state } = useLocation(); // get props
    const { serverInfo } = state; // set server info with props
    const [userList, setUserList] = useState([] as any[]); // track list of users watching the server
    var users = new Array(); // temporary user list variable
    const [userToAddOrDelete, setUserToAddOrDelete] = useState(""); // tracks user to add or delete from server
    const [addUserError, setAddUserError] = useState(false); // tracks if error when adding user
    const [emailFormatError, setEmailFormatError] = useState(false); // tracks if error in email format
    const [deleteUserError, setDeleteUserError] = useState(false); // tracks if error when deleting user

    // get all users on the server
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
        // reset errors
        setAddUserError(false);
        setDeleteUserError(false);
        setEmailFormatError(false);

        // check for format error
        if (!checkEmail(userToAddOrDelete)) {
            setEmailFormatError(true);
        }
        else if (await addServerToUser(userToAddOrDelete, serverInfo.address)) {
            getUserList();
            setUserToAddOrDelete("");
        }
        else {
            setAddUserError(true);
        }
    };

    /**
     * Handle delete user from server
     */
    const deleteUserFromServer = async () => {
        // reset errors
        setAddUserError(false);
        setDeleteUserError(false);
        setEmailFormatError(false);

        // check for format error
        if (!checkEmail(userToAddOrDelete)) {
            setEmailFormatError(true);
        }
        else if (await removeServerFromUser(userToAddOrDelete, serverInfo.address)) {
            getUserList();
            setUserToAddOrDelete("");
        }
        else {
            setDeleteUserError(true);
        }
    };

    return (
        <div className="Single-Server-Page">
            <Header />
            <div className='Form-Body'>
                <form>
                    <BackButton></BackButton>
                    <p className="title" style={{ fontWeight: "bold", textAlign: "center", color: "#24272C", fontSize: 30 }}>Users Watching Server: {serverInfo.address}</p>
                    <table className="userTable" style={{ margin: 'auto', boxShadow: 'none', left: 'auto' }}>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>User Type</th>
                            </tr>
                        </thead>
                        {userList.map((user) => {
                            return (
                                <tbody key={user.username}>
                                    <tr className="userRow" onClick={() => setUserToAddOrDelete(user.username)}>
                                        <td>{user.userFirstName}</td>
                                        <td>{user.userLastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.userType}</td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                    <input type='text' style={{ width: 350, margin: 'auto' }} placeholder="User Email Address" value={userToAddOrDelete} onChange={handleChange}></input>
                    <br></br>
                    <p className='error' style={{ display: emailFormatError ? '' : 'none', margin: 'auto' }}>Please enter a valid email address</p>
                    <p className='error' style={{ display: addUserError ? '' : 'none', margin: 'auto' }}>Unable to add server to user</p>
                    <p className='error' style={{ display: deleteUserError ? '' : 'none', margin: 'auto' }}>Unable to remove server from user</p>
                    <div >
                        <button type="button" onClick={addUserToServer}>Add</button>
                        <button type="button" onClick={deleteUserFromServer}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminSingleServerPage;