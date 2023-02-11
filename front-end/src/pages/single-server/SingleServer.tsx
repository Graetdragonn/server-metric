import { useLocation } from "react-router-dom";
import '../../style/Master.css';
import Header from "../../components/navigation-bar/Header";

const SingleServer = () => {

  const location = useLocation();
  const { state } = location;

  return (
    <div className="Single-Server-Page">
      <Header />
      <p className="title">Page for server {state}!</p>
    </div>
  );
}
  
export default SingleServer;