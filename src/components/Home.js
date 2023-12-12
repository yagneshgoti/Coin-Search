import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import "./Home.css";


const Home = () => {
  const navigate = useNavigate();

  const [coins, setCoins] = useState([]);
  const { currency, symbol } = CryptoState();

  let config = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coins`,
    params: {
      referenceCurrencyUuid: `${currency === "INR" ? "6mUvpzCc2lFo" : "yhjMzLPhuIDl"}`,
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '5',
      offset: '0'
    },
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
    <>
      <div className="bannerContainer">
        <div className="banner">
          <h1>Coin Search</h1>
        </div>
        <div className="bannerText">
          <h3>Tire-1 Coins</h3>
        </div>
      </div>
      <div className="buttonContainer">
        {coins.map((item, index) => {
          return <div className="coinContainer">
            <div className="rankingContainer">
              <p className="rank" style={{ backgroundColor: item.color }}>#{item.rank}</p>
              <div className="img-symbol">
                <img className="coinIcon" src={item.iconUrl} alt={item.symbol} />
                <p className="coinName" style={{ color: item.color }}>{item.name.toUpperCase()}</p>
                <p className="coinSymbol">{item.symbol.toUpperCase()}</p>
              </div>
            </div>
            <table>
              <tr>
                <td>Price</td>
                <td className="price">{symbol} {formatNumber(Number(item.price)).toString()}</td>
                <td>Change </td>
                <td className="change" style={{
                  color: item.change > 0 ? "green" : 'red'
                }}>
                  {item.change}%</td>
              </tr>
              <tr>
                <td>24h</td>
                <td className="volume">{symbol} {formatNumber(Number(item["24hVolume"]), 2).toString()}</td>
                <td>MarketCap</td>
                <td className="marketcap">{symbol} {formatNumber(Number(item.marketCap)).toString()}</td>
              </tr>
            </table>
          </div>
        })}
        <button className="button" onClick={() => navigate("/coins")}>View More</button>
      </div>
    </>
  );
};

export default Home;

export function formatNumber(num, precision = 2) {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num;
}