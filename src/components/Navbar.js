import React, { useState } from "react";
import { FaCoins, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { CryptoState } from "../CryptoContext";

const Navbar = () => {
  const { setCurrency } = CryptoState();

  const [isToggled, setToggle] = useState(true);

  const callback = () => {
    setToggle(!isToggled);
    setCurrency(isToggled ? "INR" : "USD");
  };

  return (
    <div className="navContainer">
      <Link to="/">
        <div className="navbar">
          <FaCoins className="icon" />
          <h1>
            {" "}
            Coin <span className="purple">Search</span>
          </h1>
        </div>
      </Link>

      <label class="switch">
        <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
        <span class="slider round"></span>
      </label>
    </div>
  );
};

export default Navbar;
