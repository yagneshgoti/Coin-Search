import React from "react";
import { CryptoState } from "../CryptoContext";
import "./Coins.css";
import { formatNumber } from "./Home";

const CoinItem = ({ coins }) => {
  const { symbol } = CryptoState();
  return (
    <>
      <td >{coins.rank}</td>
      <td>
        <a href={coins.coinrankingUrl}>
          <img src={coins.iconUrl} alt="logo" width="30px" />
        </a>
        <p>{coins.name}</p>
      </td>
      <td>
        {symbol}
        {Number(coins.price).toFixed(2)}
      </td>
      <td style={{
        color: coins.change > 0 ? "green" : 'red'
      }}>{coins.change}%</td>
      <td className="symbol">{symbol}
        {Number(coins["24hVolume"])}</td>
      <td>{symbol}
        {Number(coins.marketCap).toFixed(2)}</td>
    </>
  );
};

export default CoinItem;
