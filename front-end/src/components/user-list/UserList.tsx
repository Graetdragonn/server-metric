import {useEffect, useState} from "react";
import { getAllUsers, getUserInfo, getClientList } from "./UserListLogic";
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import * as Constants from "../../constants";

/**
 * Component to display a list of users
 * @returns all users for admin, all clients for service manager
 */
export default function UserList() {
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
    }else if (localStorage.getItem("userType") === "SERVICE_MANAGER") {
      getClients();

    }

  }, [])

  const goToEdit = async (email: string) => {
    var res = await getUserInfo(email);
    navigate(Constants.ADMIN_EDIT_USER_PAGE, { state: { userInfo: res } });
  }

  // go to edit client for service manager
  const goToEditSM = async (email: string) => {
    var res = await getUserInfo(email);
    navigate(Constants.SERVICE_PROVIDER_EDIT_USER_PAGE, { state: { userInfo: res } });
  }


  // RETURN ALL USERS FOR ADMIN
  if (localStorage.getItem("userType") === "ADMIN") {
    return (
      <div>
        <table className="userTable" style={{ display: localStorage.getItem("userType") === "ADMIN" ? '' : 'none' }}>
          <caption onClick={() => navigate(Constants.ADMIN_ALL_USERS_PAGE)}>All Users</caption>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
    );
  }

  // RETURN ALL CLIENTS FOR SERVICE MANAGER
  else if (localStorage.getItem("userType") === "SERVICE_MANAGER") {
    return (
      <div>
        <table className="userTable" style={{ display: localStorage.getItem("userType") === "SERVICE_MANAGER" ? '' : 'none' }}>
          <caption>All Clients</caption>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Service Provider</th>
            </tr>
          </thead>
          {userList.map((user) => {
            return (

              <tbody key={user.client.username}>
                <tr  className="userRow" onClick={() => goToEditSM(user.client.username)}>
                  <td>{user.client.userFirstName}</td>
                  <td>{user.client.userLastName}</td>
                  <td>{user.client.username}</td>
                  <td>{user.serviceProvider}</td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
    );
  }

  return null;

}