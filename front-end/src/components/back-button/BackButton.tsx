import '../../style/Master.css'
import { useNavigate } from "react-router-dom";
import back from './return.png'


/**
 * To render a button that takes user to previous page
 * @returns a back button
 */
export default function BackButton() {
    const navigate = useNavigate();
    return (
        <div className="backbutton"  onClick={() => navigate(-1)}> <img style={{ width:30, height: 30}} src={back} alt="Logo" /> </div>
    )
}
