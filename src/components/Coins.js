import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import Coin from "../routes/Coin";
import CoinItem from "./CoinItem";
import "./Coins.css";
import viewmore_icon from './../assets/viewmore_icon.png'

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState();

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://coinranking1.p.rapidapi.com/coins?timePeriod=24h&referenceCurrencyUuid=${currency === "INR" ? "6mUvpzCc2lFo" : "yhjMzLPhuIDl"
      }`,
    headers: {
      "X-RapidAPI-Key": "dda6075c55mshad4c206e3fa84ddp120d85jsnd4f21c836c91",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        let coins = response?.data?.data?.coins;
        if (coins) {
          console.log(coins);
          setCoins(coins);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currency]);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search coin..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="input-box"
      />
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Price</td>
            <td>Change</td>
            <td>24h Volume</td>
            <td>Market Cap</td>
            <td></td>
          </tr>
        </thead>
        {coins.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase());
        }).map((item) => {
          return (
            <tr>
              <td >{item.rank}</td>
              <td>
                <a href={item.coinrankingUrl}>
                  <img src={item.iconUrl} alt="logo" width="30px" />
                </a>
                <p>{item.name}</p>
              </td>
              <td>
                {symbol}
                {Number(item.price).toFixed(2)}
              </td>
              <td style={{
                color: item.change > 0 ? "green" : 'red'
              }}>{item.change}%</td>
              <td className="symbol">{symbol}
                {Number(item["24hVolume"])}</td>
              <td>{symbol}
                {Number(item.marketCap).toFixed(2)}</td>
              <td>

                <Link style={{ width: 0 }} to={`/coin/${item.uuid}`} element={<Coin />} key={item.id}>
                  <img className="viewmore-icon" src={viewmore_icon} alt="view more" />
                </Link>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Coins;
