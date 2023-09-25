import React from "react";
import "../App.css"
import { useSelector } from "react-redux";

const MyLogo = () => {

  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="logo-container">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        {currentUser ? (
          <p className="Lparaf">
            <span>IRFAN</span>
            <span>CAKIR</span>
          </p>
        ) : (<p className="Lparaf">
          <span>My</span>
          <span>CODING</span>
        </p>)}
        
      </div>
    </div>
  );
};

export default MyLogo;
