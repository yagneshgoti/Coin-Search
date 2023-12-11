import React from "react";
import "./Coins.css";
import { CryptoState } from "../CryptoContext";

const CoinItem = ({ coins }) => {
  const { currency } = CryptoState();
  return (
    <div className="coin-row">
      <p>{coins.rank}</p>
      <div className="img-symbol">
        <img src={coins.iconUrl} alt="" />
        <p>{coins.symbol.toUpperCase()}</p>
      </div>
      <p>
        {currency == "INR" ? "₹" : "$"}
        {Number(coins.price).toFixed(2)}
      </p>
      <p>{coins.change}% change</p>
      <p className="hide-mobile">
        {currency == "INR" ? "₹" : "$"}
        {Number(coins["24hVolume"]).toFixed(2).toLocaleString()}
      </p>
      <p className="hide-mobile">
        {currency == "INR" ? "₹" : "$"}
        {Number(coins.marketCap).toFixed(2).toLocaleString()}
      </p>
    </div>
  );
};

export default CoinItem;
