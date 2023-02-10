import React from "react";
import '../../style/Master.css'
import NavBar from "../../components/navigation-bar/NavBar";

const DashboardPage = () => {
  return (
    <div>
      <NavBar />
      <p className="title">Dashboard page!</p>
    </div>
  );
}
  
export default DashboardPage;