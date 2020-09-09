import React, { useEffect, useState } from "react";
import hash from "../hash";
// import { authEndpoint, scopes } from "..";
// import Player from "./Player";
import { observer } from "mobx-react-lite";
import { useMst } from "../models";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

import qs from "querystring";

// THIS IS MESSY
import lofiJpg from "../assets/lofi-static.jpg";
import lofiGif from "../assets/lofi.gif";
import lofiTT from "../assets/lofititle.png";
import lofiTG from "../assets/lofititle.gif";

import spotifyGif from "../assets/spotify.gif";
import spotifyJpg from "../assets/spotify.png";
import spotifyBGJ from "../assets/spotifybg.png";
import spotifyBGG from "../assets/spotifybg.gif";
import { getTokens } from "../api/spotify";
// I DONT LIKE DIRECT IMPORTS

export default observer(() => {
  const store = useMst();

  const { theme } = store.player;

  const [lofiHovering, setLofiHovering] = useState(false);
  const [spotifyHovering, setSpotifyHovering] = useState(false);

  const navigate = useNavigate();

  async function initSpotify(code: any) {
    const { data } = await getTokens(
      btoa(
        `${store.player.spotify.clientId}:${store.player.spotify.clientSecret}`
      ),
      code,
      "http://localhost:9080"
    );

    const { access_token, refresh_token } = data;

    if (access_token && refresh_token) {
      store.player.spotify.setToken(access_token);
      store.player.spotify.setRefreshToken(refresh_token);
    }

    window.location.href = "/";
  }

  useEffect(() => {
    const code = qs.parse(window.location.search)["?code"];

    if (code) {
      initSpotify(code);
    }
  });

  // const { token } = store.player;

  return (
    <div className={clsx(theme === "dark" && "bg-dark", "min-h-screen")}>
      {/* <h1 className="text-6xl font-bold text-gray-900">menubar boiler!</h1>
      <p>This is a shell to start creating electron based menu applications</p> */}
      <Header
        dark={theme === "dark"}
        title="Welcome"
        action={
          <Link
            to="settings"
            className={clsx(
              theme === "dark"
                ? "text-white hover:bg-gray-700 "
                : "hover:bg-gray-200 ",
              "rounded-full p-2 focus:outline-none transition-colors duration-150"
            )}
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="cog w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        }
      />
      {/* {!token && (
        <div className="p-6 text-center flex flex-col items-center space-y-6">
          <h3 className="text-xl font-bold text-gray-900">
            Welcome to the menubar Spotify applet
          </h3>
          <a
            className="rounded-full border-2 border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white transition-colors focus:outline-none duration-300 flex text-lg px-4 py-2 items-center justify-center font-semibold"
            href={`${authEndpoint}?client_id=${
              process.env.CLIENT_ID
            }&redirect_uri=${process.env.REDIRECT_URL}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        </div>
      )} */}
      <div className="full-minus-header">
        <div
          className="h-1/2 relative overflow-hidden bg-black"
          onMouseEnter={() => setSpotifyHovering(true)}
          onMouseLeave={() => setSpotifyHovering(false)}
          // style={{ backgroundImage: `url("${gif}")` }}
        >
          {spotifyHovering ? (
            <img className="object-cover w-full" src={spotifyBGG} />
          ) : (
            <img className="object-cover w-full" src={spotifyBGJ} />
          )}

          <Link
            to="/spotify"
            className="absolute inset-0 flex items-center justify-center text-white font-semibold text-2xl text-shadow-lg tracking-wider"
          >
            {spotifyHovering ? (
              <img className="object-scale-down w-1/2" src={spotifyGif} />
            ) : (
              <img className="object-scale-down w-1/2" src={spotifyJpg} />
            )}
          </Link>
        </div>
        <div
          className="h-1/2 relative overflow-hidden hoverable-gif"
          onMouseEnter={() => setLofiHovering(true)}
          onMouseLeave={() => setLofiHovering(false)}
          // style={{ backgroundImage: `url("${gif}")` }}
        >
          {lofiHovering ? (
            <img className="object-cover w-full" src={lofiGif} />
          ) : (
            <img className="object-cover w-full" src={lofiJpg} />
          )}

          <Link
            to="/lofi"
            className="absolute inset-0 flex items-center justify-center text-white font-semibold text-4xl text-shadow-lg tracking-wider"
          >
            {lofiHovering ? (
              <img className="object-scale-down w-1/2" src={lofiTG} />
            ) : (
              <img className="object-scale-down w-1/2" src={lofiTT} />
            )}
          </Link>
        </div>
      </div>

      {/* {token && <Player />} */}
    </div>
  );
});
