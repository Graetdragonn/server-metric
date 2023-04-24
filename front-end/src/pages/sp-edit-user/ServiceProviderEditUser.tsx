import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/back-button/BackButton';
import NavBar from '../../components/navigation-bar/NavBar';
import '../../style/Master.css';
import { getServiceProviderList, addClientToServerProvider } from "../../pages/add-user/AddUserLogic";
import { deleteServerProviderClientByEmail, getClientServiceProvider } from '../delete-user/DeleteUserLogic';
import * as Constants from "../../constants";

export default function ServiceProviderEditUserPage() {
    const navigate = useNavigate(); // for screen navigation
    const { state } = useLocation(); // get props

    // set user info for props
    const { userInfo } = state;
    const [info, setInfo] = useState({
        email: userInfo['username'],
        first: userInfo['userFirstName'],
        last: userInfo['userLastName'],
        pass: userInfo['userPassword'],
        confirmPass: userInfo['userPassword'],
        userType: userInfo['userType'],
        servers: userInfo['servers'],
        sp: ""
    });

    // tracks client's current service provider
    const [serviceProvider, setServiceProvider] = useState("");

    // gets list of all service providers
    var serviceProviders = [] as any[];
    const [serviceProviderList, setServiceProviderList] = useState([] as any[]);

    // checks for errors
    const [error, setError] = useState(true);

    // submits user changes
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if changes service providers
        if (info.sp !== serviceProvider) {
            if (serviceProvider === "") {
                await deleteServerProviderClientByEmail(info.sp, info.email)
                setError(false);
            }
            else {
                if (info.sp === "") {
                    await addClientToServerProvider(serviceProvider, info.email);
                    setError(false);
                }
                else if (await deleteServerProviderClientByEmail(info.sp, info.email) !== "ERROR") {
                    await addClientToServerProvider(serviceProvider, info.email);
                    setError(false);
                }
            }
        }
        else {
            setError(false);
        }
    }

    // get list of all service providers
    const getServiceProviders = async () => {
        serviceProviders = await getServiceProviderList();
        setServiceProviderList(serviceProviders);
    }
    getServiceProviders();

    // get service provider of client
    const getSP = async () => {
        var temp = await getClientServiceProvider(info.email);
        setServiceProvider(temp);
        setInfo({
            ...info,
            sp: temp
        });
    }

    useEffect(() => {
        getSP();
    }, []);

    return (
        <><NavBar />
            <div className='Form-Body' >
                <div>
                    <form onSubmit={handleSubmit} style={{ display: error ? '' : 'none' }} >
                        <BackButton />
                        <h1>User Information</h1>
                        <div className="row" style={{ display: "flex" }}>
                            <div>
                                <label>First Name</label>
                                <input style={{ width: "80%" }} readOnly={true} type="text" name="first" required={true} value={info.first} ></input>
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input type="text" name="last" readOnly={true} required={true} value={info.last} ></input>
                            </div>
                        </div>
                        <br />
                        <label>Email</label>
                        <input type="text" name="last" readOnly={true} required={true} value={info.email} ></input>
                        <br />
                        <label>Client's Service Provider</label>
                        <div className='center'>

                            <select value={serviceProvider} onChange={(e) => setServiceProvider(e.target.value)}>
                                <option value=""> </option>
                                {serviceProviderList.map(user => { return <option value={user.username}>{user.userFirstName} {user.userLastName}</option>; })}
                            </select>
                        </div>

                        <button type='submit'>Submit</button>
                        <br />
                    </form>
                    <form style={{ display: error ? 'none' : '' }}>
                        <p style={{ fontSize: 20, textAlign: 'center' }}>User {info.email} was updated</p>
                        <button onClick={() => navigate(Constants.DASHBOARD_PAGE)}>Dashboard</button>
                    </form>
                </div>
            </div></>
    );
}
