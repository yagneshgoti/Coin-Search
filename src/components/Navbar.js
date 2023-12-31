import React, { useState } from "react";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import "./Navbar.css";

const Navbar = () => {
  const { setCurrency } = CryptoState();

  const [isToggled, setToggle] = useState(false);

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

      <div className="radioButtonSwitchContainer">
        <h3 className="label">{'₹'}</h3>
        <label class="switch">
          <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
          <span class="slider round"></span>
        </label>
        <h3 className="label">{'$'}</h3>
      </div>
    </div>
  );
};

export default Navbar;
