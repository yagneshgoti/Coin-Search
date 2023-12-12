import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CryptoState } from "../CryptoContext";
import { formatNumber } from "../components/Home";
import "./Coin.css";

const Coin = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState({});

  const { currency, symbol } = CryptoState();

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://coinranking1.p.rapidapi.com/coin/${coinId}?referenceCurrencyUuid=${currency === "INR" ? "6mUvpzCc2lFo" : "yhjMzLPhuIDl"
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
        console.log(JSON.stringify(response.data));
        if (response?.data?.data?.coin) {
          setCoin(response.data.data.coin);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [coinId, currency]);

  return (
    <div>
      <div className="coin-container">
        <div className="content">
          <h1>{coin?.name ? coin.name : ""}</h1>
        </div>
        <div className="content">
          <div className="rank">
            <span className="rank-btn">Rank # {coin.rank}</span>
          </div>
          <div className="info">
            <div className="coin-heading">
              {coin.iconUrl ? <img src={coin.iconUrl} alt="" /> : null}
              <p>{coin?.name}</p>
              {coin.symbol ? (
                <p>
                  {coin.symbol.toUpperCase()}/{currency}
                </p>
              ) : null}
            </div>
            <div className="coin-price">
              {coin.price ? (
                <h1>
                  {symbol} {formatNumber(Number(coin.price))}
                </h1>
              ) : null}
            </div>
          </div>
        </div>

        <div className="content">
          {/* <table>
            <thead>
              <tr>
                {["1h", "24h", "7d", "14d", "30d", "1yr"].map((item, index) => (
                  <th>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {coin.market_data?.price_change_percentage_1h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table> */}
          {/* <Line data={data} /> */}
        </div>
        <div className="content">
          <div className="stats">
            <div className="left">
              <div className="row">
                <h4>24 Hour Low</h4>
                {coin.market_data?.low_24h ? (
                  <p>{symbol}{coin.market_data.low_24h.usd.toLocaleString()}</p>
                ) : null}
              </div>
              <div className="row">
                <h4>24 Hour High</h4>
                {coin.market_data?.high_24h ? (
                  <p>{symbol} {coin.market_data.high_24h.usd.toLocaleString()}</p>
                ) : null}{" "}
              </div>
            </div>
            <div className="right">
              <div className="row">
                <h4>Market Cap</h4>
                {coin?.marketCap ? (
                  <p>
                    {symbol}
                    {formatNumber(Number(coin.marketCap))}
                  </p>
                ) : null}
              </div>
              <div className="row">
                <h4>Circulating Supply</h4>
                {coin?.supply?.circulating ? (
                  <p>{coin.supply.circulating}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="about">
            <h3>About</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  coin.description ? coin.description : ""
                ),
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
