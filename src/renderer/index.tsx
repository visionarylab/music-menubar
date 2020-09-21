import "./index.css";
import React from "react";
import { render } from "react-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Provider } from "./models";
import Settings from "./pages/Settings";
import YTHome from "./pages/YouTube/YTHome";
import YTPlaylistPlayer from "./pages/YouTube/YTPlaylistPlayer";
import YTStreamPlayer from "./pages/YouTube/YTStreamPlayer";
import YTFavorites from "./pages/YouTube/YTFavorites";

require("dotenv").config();

function App() {
  return (
    <Provider>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/youtube" element={<YTHome />} />
          <Route path="/youtube/favorites" element={<YTFavorites />} />
          <Route
            path="/youtube/playlist/:index"
            element={<YTPlaylistPlayer />}
          />
          <Route path="/youtube/stream/:index" element={<YTStreamPlayer />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

render(<App />, document.getElementById("app"));
