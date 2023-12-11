import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, json } from "react-router-dom";
import Coins from "./components/Coins";
import Coin from "./routes/Coin";
import Navbar from "./components/Navbar";
import CryptoContext, { CryptoState } from "./CryptoContext";
import Home from "./components/Home";

function App() {
  return (
    <>
      <CryptoContext>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/coin" element={<Coin />}>
            <Route path=":coinId" element={<Coin />} />
          </Route>
        </Routes>
      </CryptoContext>
    </>
  );
}

export default App;
