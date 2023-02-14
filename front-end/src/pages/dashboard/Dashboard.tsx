import '../../style/Master.css'
import Header from "../../components/navigation-bar/Header";

const DashboardPage = () => {
  //const navigate = useNavigate();
  return (
    <div className="Dashboard-Page">
      <Header />
      <p className="title">Dashboard page!</p>
    </div>
  );
}
  
export default DashboardPage;