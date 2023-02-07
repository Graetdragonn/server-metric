import '../../style/Master.css'
import { useNavigate } from "react-router-dom";

export default function BackButton(){
    const navigate = useNavigate();
    return <div className="backbutton" onClick={() => navigate(-1)}> back
    </div>
}