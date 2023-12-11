import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinItem from "./CoinItem";
import Coin from "../routes/Coin";
import { Link } from "react-router-dom";
import "./Coins.css";
import { CryptoState } from "../CryptoContext";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const { currency } = CryptoState();

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://coinranking1.p.rapidapi.com/coins?timePeriod=24h&referenceCurrencyUuid=${
      currency == "INR" ? "6mUvpzCc2lFo" : "yhjMzLPhuIDl"
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
        // console.log(response.data[0])
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currency]);

  return (
    <div className="container">
      <div>
        <div className="heading">
          <p>#</p>
          <p className="coin-name">Coin</p>
          <p style={{ textAlign: "center" }}>Price</p>
          <p>% Change</p>
          <p className="hide-mobile">24h Volume</p>
          <p className="hide-mobile">Mkt Cap</p>
        </div>

        {coins.map((coins) => {
          return (
            <Link to={`/coin/${coins.uuid}`} element={<Coin />} key={coins.id}>
              <CoinItem coins={coins} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Coins;
