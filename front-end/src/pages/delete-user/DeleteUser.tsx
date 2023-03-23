import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import Header from "../../components/navigation-bar/Header";
import { getAllUsers } from "../../components/user-list/UserListLogic";
import UserService from "../../requests/UserService";
import { emailCheck, checkEmpty, getUserType } from "../login/LoginLogic";
import { deleteServerProviderClientByEmail, deleteUser, getClientServiceProvider } from "./DeleteUserLogic";


const DeleteUserPage = () => {
  // for screen navigation
  const navigate = useNavigate();

  // user input for email
  const [email, setEmail] = useState("default");

  // all users
  const [userList, setUserList] = useState([] as any[]);

  // tracks if email is valid
  const [isValidEmail, setIsValidEmail] = useState(false);

  // tracks if error
  const [error, setError] = useState(false);

  // tracks user's service provider
  const [serviceProvider, setServiceProvider] = useState("");

  // tracks if user is a client
  const [clientType, setClientType] = useState(false);

  // user information
  const [state, setState] = useState({
    email: " ",
    first: " ",
    last: " ",
    userType: " ",
    servers: []
});

  // get service provider of client
  const getSP = async () => {
    if(email !== "default" && await getUserType(email) === "CLIENT"){
      setClientType(true);
      setServiceProvider(await getClientServiceProvider(email));
    }
  }
  getSP();

  // get user info
  const getUserInfo = async (email: string) => {
    const userInfo = await UserService.getUserByEmail(email);
    var userData = JSON.parse(userInfo);
    setState({...state, "email": email, "first": userData['userFirstName'], "last": userData['userLastName'], "userType": userData['userType'], "servers": userData['servers']});
  }

  // get all servers
  const getUserList = async () => {
    var users = await getAllUsers();
    setUserList(users);
  }
  getUserList();

  // to update user information when user inputs data
  const handleChange = async (e: { target: { name: string; value: any; }; }) => {
    setEmail(e.target.value);
    if (e.target.value !== "default") {
      await getUserInfo(e.target.value);
    }
    else {
          setState({...state, "email": " ", "first": " ", "last": " ", "userType": " ", "servers": []});
    }
  };

  // submits form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // if client, then delete from service provider list first
    if(clientType) {
      await deleteServerProviderClientByEmail(serviceProvider, email);
    }

    // verifies fields and deletes user by email
    if (emailCheck(email) && !checkEmpty(email)) {
        if(await deleteUser(email)){
            setIsValidEmail(true);
        }
        else {
            setError(true);
      }
    }

    setEmail("");

  };

  return (
    <div className='Forgot-Password-Page'>
      <Header></Header>
      <div className='Form-Body'>
        <div>
          <form onSubmit={handleSubmit} style={{ display: isValidEmail ? 'none' : '' }}>
            <BackButton></BackButton>
            <h1>Delete a User</h1>
            <div className="center">
              <select onChange={handleChange}>
                <option value="default"> - Select a User to Delete -</option>
                {userList.map(user => { return <option value={user.username}>{user.username}</option>; })}
              </select>
            </div>
            <div style={{margin: 'auto'}}>
            <div className="row" style={{display: 'flex'}}> <p>First Name: &nbsp; </p><p>{state.first}</p> </div>
              <div className="row" style={{display: 'flex'}}> <p>Last Name: &nbsp; </p><p>{state.last}</p> </div>
              <div className="row" style={{display: 'flex'}}> <p>User Type: &nbsp; </p><p>{state.userType}</p> </div>
            </div>
            <button>Submit</button>
            <br></br>
            <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>Please select a user</span>
          </form>
          <form onSubmit={handleSubmit} style={{ display: isValidEmail ? '' : 'none' }}>
            <p style={{ fontSize: 20, textAlign: 'center' }}>User {email} was successfully deleted</p>
            <button onClick={() => navigate('/dashboard')}>Back to dashboard</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserPage;