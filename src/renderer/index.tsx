import "./index.css";
import React from "react";
import { render } from "react-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Provider } from "./models";
import Settings from "./pages/Settings";
import ToastManager from "./components/ToastManager";
import YouTube from "./pages/YouTube";
import Spotify from "./pages/Spotify";
import SoundCloud from "./pages/SoundCloud";

// import qs from "querystring";

// let re = ".*?";
// console.log(
//   qs.parse("v=fkM3nSz_qjc&list=PLm5pKYShxnXB1g2LixFdKxjAvl3P2O4Hm&index=44")
// );

// const test = new URLSearchParams(
//   "https://www.youtube.com/watch?v=fkM3nSz_qjc&list=PLm5pKYShxnXB1g2LixFdKxjAvl3P2O4Hm&index=44"
// );

// test.forEach((e) => console.log(e));

require("dotenv").config();

function App() {
  return (
    <Provider>
      <ToastManager>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/youtube/*" element={<YouTube />} />
            <Route path="/spotify/*" element={<Spotify />} />
            <Route path="/soundcloud/*" element={<SoundCloud />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </MemoryRouter>
      </ToastManager>
    </Provider>
  );
}

render(<App />, document.getElementById("app"));
