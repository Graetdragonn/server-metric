import logo from '../../images/logo.png';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className="Start-Page">
      <header className="App-header">
        <h1 className='Gradient-Text'>
          Server Metric Tracker
        </h1>
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>
          <button type="button" onClick={() => navigate('/login')}>Sign In</button>
        </div>
        <div>
          <button type="button" onClick={() => navigate('/createaccount')}>Create Account</button>
        </div>
      </header>

    </div>
  );
}

export default StartPage;

