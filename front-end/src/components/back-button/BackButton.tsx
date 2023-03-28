import '../../style/Master.css'
import { useNavigate } from "react-router-dom";

/**
 * To render a button that takes user to previous page
 * @returns a back button
 */
export default function BackButton() {
    const navigate = useNavigate();
    return (
        <div className="backbutton" onClick={() => navigate(-1)}> back </div>
    )
}
