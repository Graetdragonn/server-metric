import { useState } from "react";
import { getAllUsers } from "./UserListLogic";
import '../../style/Master.css';

export default function UserList(){
    const [userList, setUserList] = useState([] as any[]);
    var users = new Array();
    
    const getUserList = async () => {
        users = await getAllUsers();
        setUserList(users);
    }
    getUserList();
    

    //console.log(JSON.stringify(userList));
    return (
    <div >
    
      <table className="userTable">
      <h1>All Users</h1>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>User Type</th>
        </tr>
        {userList.map((user) => {
          return (
            <tr className = "userRow" onClick={() => alert(user.userFirstName)}>
              <td>{user.userFirstName}</td>
              <td>{user.userLastName}</td>
              <td>{user.userEmail}</td>
              <td>{user.userType}</td>
            </tr>
          )
        })}
      </table>
    </div>
    );
}