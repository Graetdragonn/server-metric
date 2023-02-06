import './BackButton.css'
import { useNavigate } from "react-router-dom";

export default function BackButton(){
    const navigate = useNavigate();
    return <div className="backbutton" onClick={() => navigate('/')}> back
    </div>
}