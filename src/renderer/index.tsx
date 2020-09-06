import "./index.css";
import React from "react";
import { render } from "react-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Provider } from "./models";
import Settings from "./pages/Settings";
import LofiHome from "./pages/lofi/LofiHome";
import LofiPlaylistPlayer from "./pages/lofi/LofiPlaylistPlayer";
import LofiStreamPlayer from "./pages/lofi/LofiStreamPlayer";

require("dotenv").config();

export const authEndpoint = "https://accounts.spotify.com/authorize";

export const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
];

function App() {
  return (
    <Provider>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lofi" element={<LofiHome />} />
          <Route
            path="/lofi/playlist/:index"
            element={<LofiPlaylistPlayer />}
          />
          <Route path="/lofi/stream/:index" element={<LofiStreamPlayer />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

render(<App />, document.getElementById("app"));
