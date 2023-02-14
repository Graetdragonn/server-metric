import '../../style/Master.css'
import Header from "../../components/navigation-bar/Header";
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <div className="Dashboard-Page">
      <Header />

      <button className='addServer' onClick={() => navigate('/addserver')}>Add Server</button>
    </div>
  );
}
  
export default DashboardPage;