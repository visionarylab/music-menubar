import "./index.css";
import React from "react";
import { render } from "react-dom";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Provider } from "./models";
import Settings from "./pages/Settings";
import LofiHome from "./pages/lofi/LofiHome";
import LofiPlaylistPlayer from "./pages/lofi/LofiPlaylistPlayer";
import LofiStreamPlayer from "./pages/lofi/LofiStreamPlayer";
import SpotifyPlayer from "./pages/spotify/SpotifyPlayer";
import SpotifySettings from "./pages/spotify/SpotifySettings";

require("dotenv").config();

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
          <Route path="/spotify" element={<SpotifyPlayer />} />
          <Route path="/spotify/settings" element={<SpotifySettings />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

render(<App />, document.getElementById("app"));
