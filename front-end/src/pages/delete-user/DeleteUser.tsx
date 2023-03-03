import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import Header from "../../components/navigation-bar/Header";
import { getAllUsers } from "../../components/user-list/UserListLogic";
import { emailCheck, checkEmpty, getUserType } from "../login/LoginLogic";
import { deleteServerProviderClientByEmail, deleteUser, getClientServiceProvider } from "./DeleteUserLogic";


const DeleteUserPage = () => {
  // for screen navigation
  const navigate = useNavigate();

  // user input for email
  const [email, setEmail] = useState("");

  // all users
  const [userList, setUserList] = useState([] as any[]);

  const [isValidEmail, setIsValidEmail] = useState(false);

  const [error, setError] = useState(false);

  const [serviceProvider, setServiceProvider] = useState("");

  const [clientType, setClientType] = useState(false);

  // get service provider of client
  const getSP = async () => {
    if(await getUserType(email) === "CLIENT"){
      setClientType(true);
      setServiceProvider(await getClientServiceProvider(email));
    }
  }
  getSP();

  // get all servers
  const getUserList = async () => {
    var users = await getAllUsers();
    setUserList(users);
  }
  getUserList();

  // to update user information when user inputs data
  const handleChange = (e: { target: { name: string; value: any; }; }) => {
    setEmail(e.target.value);
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

  };

  return (
    <div className='Forgot-Password-Page'>
      <Header></Header>
      <body className='Form-Body'>
        <div>
          <form onSubmit={handleSubmit} style={{ display: isValidEmail ? 'none' : '' }}>
            <BackButton></BackButton>
            <h1>Delete a User</h1>
            <div className="center">
              <select onChange={handleChange}>
                <option value="default"> - Select a User to Delete -</option>
                {userList.map(user => { return <option value={user.userEmail}>{user.userEmail}</option>; })}
              </select>
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
      </body>
    </div>
  );
}

export default DeleteUserPage;