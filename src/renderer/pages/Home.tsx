import React, { useEffect, useCallback } from "react";
import hash from "../hash";
import { authEndpoint, scopes } from "..";
// import Player from "./Player";
import { observer } from "mobx-react-lite";
import { useMst } from "../models";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import clsx from "clsx";

// TODO: add global theme (light v dark)

export default observer(() => {
  const store = useMst();

  const theme = localStorage.getItem("theme");

  // const createProgram = useCallback(() => {
  //   store.player.createProgram();
  // }, [store]);

  useEffect(() => {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      store.player.setToken(_token);
    }
  });

  // const { token } = store.player;

  return (
    <div
      className={clsx(theme && theme === "dark" && "bg-dark", "min-h-screen")}
    >
      {/* <h1 className="text-6xl font-bold text-gray-900">menubar boiler!</h1>
      <p>This is a shell to start creating electron based menu applications</p> */}
      <Header
        dark={theme ? theme === "dark" : false}
        title="Welcome"
        action={
          <Link
            to="settings"
            className={clsx(
              theme && theme === "dark"
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

      <Link to="lofi">go to lofi</Link>

      {/* {token && <Player />} */}
    </div>
  );
});
