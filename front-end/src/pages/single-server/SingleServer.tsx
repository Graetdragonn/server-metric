import React from "react";
import { useLocation } from "react-router-dom";
import '../../style/Master.css';
import NavBar from "../../components/navigation-bar/NavBar";

const SingleServer = () => {

  const location = useLocation();
  const { state } = location;
  console.log(state.address);

  return (
    <div className="Single-Server-Page">
      <NavBar />
      <p className="title">Individual server page!</p>
    </div>
  );
}
  
export default SingleServer;