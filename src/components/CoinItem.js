import React from "react";
import { CryptoState } from "../CryptoContext";
import "./Coins.css";

const CoinItem = ({ coins }) => {
  const { symbol } = CryptoState();
  return (
    <div className="coin-row">
      <p>{coins.rank}</p>
      <div className="img-symbol">
        <img src={coins.iconUrl} alt="" />
        <p>{coins.symbol.toUpperCase()}</p>
      </div>
      <p>
        {symbol}
        {Number(coins.price).toFixed(2)}
      </p>
      <p>{coins.change}% change</p>
      <p className="hide-mobile">
        {symbol}
        {Number(coins["24hVolume"]).toFixed(2).toLocaleString()}
      </p>
      <p className="hide-mobile">
        {symbol}
        {Number(coins.marketCap).toFixed(2).toLocaleString()}
      </p>
    </div>
  );
};

export default CoinItem;
