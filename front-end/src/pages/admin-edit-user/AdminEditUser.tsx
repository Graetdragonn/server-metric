import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/back-button/BackButton';
import Header from '../../components/navigation-bar/Header';
import '../../style/Master.css';
import { getServiceProviderList } from "../../pages/add-user/AddUserLogic";

const AdminEditUserPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { userInfo } = state;

    const [info, setInfo] = useState({
        email: userInfo['userEmail'],
        first: userInfo['userFirstName'],
        last: userInfo['userLastName'],
        pass: userInfo['userPassword'],
        confirmPass: userInfo['userPassword'],
        userType: userInfo['userType'],
        servers: userInfo['servers'],
        serviceProvider: ""
    });

    // gets list of all service providers
    var serviceProviders = new Array();
    const [serviceProviderList, setServiceProviderList] = useState([] as any[]);

    const [userServersList, setUserServersList] = useState([] as any[]);

    // checks for errors on login
    const [error, setError] = useState(true);

    // to update user information when user inputs data
    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };

    // get list of all service providers
    const getServiceProviders = async () => {
        serviceProviders = await getServiceProviderList();
        setServiceProviderList(serviceProviders);
    }
    getServiceProviders();

    useEffect(() => {
        setUserServersList(userInfo['servers']);
    }, []);

    return (
        <><Header />
            <body className='Form-Body'>
                <div>
                    <form style={{ display: error ? '' : 'none' }}>
                        <BackButton></BackButton>
                        <h1>User Information</h1>
                        <div className="row" style={{ display: "flex" }}>
                            <div>
                                <label>First Name</label>
                                <input style={{ width: "80%" }} type="text" name="first" required={true} value={info.first} onChange={handleChange}></input>
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input type="text" name="last" required={true} value={info.last} onChange={handleChange}></input>
                            </div>
                        </div>
                        <br></br>
                        <label>Email</label>
                        <input type="text" name="last" required={true} value={info.email} onChange={handleChange}></input>
                        <br></br>
                        <label>User Type</label>
                        <div className="row" style={{ display: "flex" }}>
                            <select value={info.userType} onChange={(e) => setInfo({ ...state, userType: e.target.value })}>
                                <option value="ADMIN">Admin</option>
                                <option value="SERVICE_MANAGER">Service Manager</option>
                                <option value="SERVICE_PROVIDER">Service Provider</option>
                                <option value="CLIENT">Client</option>
                            </select>
                            <select onChange={(e) => setInfo({ ...state, serviceProvider: e.target.value })} style={{ display: info.userType === "CLIENT" ? '' : 'none' }}>
                                <option value="default"> - Select Service Provider -</option>
                                {serviceProviderList.map(user => { return <option value={user.userEmail}>{user.userFirstName} {user.userLastName}</option>; })}
                            </select>
                            
                        </div>
                        <label>Servers</label>
                        <div className="row" style={{ display: "flex" }}>
                        <table className='serverList' style={{ display: userServersList.length > 0 ? '' : 'none' }}>
                            {userServersList.map(addr => {
                                return (
                                    <tr key={addr.address} className="userRow">
                                        <td>{addr.address}</td>
                                    </tr>
                                )
                            })}
                        </table>
                        <table className='serverList' style={{ display: userServersList.length > 0 ? 'none' : '' }}>
                            <tr className="userRow">
                                <td>User has no servers</td>
                            </tr>
                        </table>
                        <button className="addServerButton">Add Server</button>
                        </div>
                        <button>Submit</button>
                        <br></br>
                    </form>
                    <form style={{ display: error ? 'none' : '' }}>
                        <p style={{ fontSize: 50, textAlign: 'center' }}>Updated settings were saved to account</p>
                        <button onClick={() => navigate(-1)}>Back</button>
                    </form>
                </div>
            </body></>
    );
}

export default AdminEditUserPage;