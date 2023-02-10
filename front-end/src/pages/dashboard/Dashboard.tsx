import React from "react";
import BackButton from '../../components/back-button/BackButton';
import { useNavigate } from "react-router-dom";


const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <div >
      <BackButton></BackButton>
      <div className='settingsbutton' onClick={() => navigate('/settings')}>
        Settings
      </div>
      <p className="title">Current Server Metrics</p>
    </div>
  );
}
  
export default DashboardPage;