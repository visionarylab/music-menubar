import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../models";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import clsx from "clsx";

// import qs from "querystring";

// THIS IS MESSY
import lofiJpg from "../assets/lofi-static.jpg";
import lofiGif from "../assets/lofi.gif";
// I DONT LIKE DIRECT IMPORTS

export default observer(() => {
  const store = useMst();

  const { theme } = store.player;

  const [hovering, setHovering] = useState(false);

  // async function initSpotify(code: any) {
  //   const { data } = await getTokens(
  //     btoa(
  //       `${store.player.spotify.clientId}:${store.player.spotify.clientSecret}`
  //     ),
  //     code,
  //     "http://localhost:9080"
  //   );

  //   const { access_token, refresh_token } = data;

  //   if (access_token && refresh_token) {
  //     store.player.spotify.setToken(access_token);
  //     store.player.spotify.setRefreshToken(refresh_token);
  //   }

  //   window.location.href = "/";
  // }

  useEffect(() => {
    // const code = qs.parse(window.location.search)["?code"];
    // if (code) {
    //   initSpotify(code);
    // }
  });

  // const { token } = store.player;

  return (
    <div className={clsx(theme === "dark" && "bg-dark", "min-h-screen")}>
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
      <div className="full-minus-header">
        <div
          className="h-full relative overflow-hidden hoverable-gif"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          // style={{ backgroundImage: `url("${gif}")` }}
        >
          {hovering ? (
            <img className="object-cover w-full h-full" src={lofiGif} />
          ) : (
            <img className="object-cover w-full h-full" src={lofiJpg} />
          )}

          <Link
            to="/youtube"
            className="absolute inset-0 flex items-center justify-center text-white font-semibold text-4xl text-shadow-lg tracking-wider"
          >
            <div className="relative">
              <span className="flex h-24 w-24">
                {hovering && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                )}

                <svg
                  className={clsx(
                    "relative inline-flex rounded-full w-24 h-24"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});
