import React from "react";
import "./Home.css";
import { useNavigate  } from "react-router-dom";


const Home = () => {
  const navigate =useNavigate();

  return (
    <div className="bannerContainer">
      <div className="banner">
        <h1>Coin Search</h1>
      </div>
      <div className="bannerText">
        <h3>Get All The Info Regarding Your Favorite Crypto Currency</h3>
      </div>
      
      <div className="button">
        <button onClick={() => navigate("/coins")}>View More</button>
      </div>
    </div>
  );
};

export default Home;
