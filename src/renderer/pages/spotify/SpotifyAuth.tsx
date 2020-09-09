import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { authEndpoint, scopes } from "../../api/spotify";
import clsx from "clsx";
import { useMst } from "../../models";

export default observer(() => {
  const store = useMst();

  const { spotify, theme } = store.player;
  const dark = theme === "dark";
  // console.log(process.env.REDIRECT_URL);

  // useEffect(() => {
  //   // Set token
  //   let _token = hash.access_token;
  //   if (_token) {
  //     spotify.setToken(_token);
  //   }
  // });

  return (
    <div>
      <div className="p-6 flex flex-col items-center space-y-6">
        <h3
          className={clsx(
            dark ? "text-white" : "text-gray-900",
            "text-center text-xl font-bold"
          )}
        >
          You're missing just a couple things
        </h3>
        <p
          className={clsx(dark ? "text-white" : "text-gray-900", "text-center")}
        >
          Once you've entered your Client ID, log in using the button below
        </p>
        <div className="w-full text-left">
          <label
            className={clsx(
              dark ? "text-white" : "text-gray-700",
              "block text-sm leading-5 font-medium "
            )}
          >
            Spotify Client ID
          </label>

          <input
            className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
            type="password"
            placeholder="Enter your client ID here"
            value={spotify.clientId}
            onChange={(e) => spotify.setClientId(e.target.value)}
          />
        </div>
        <a
          className={clsx(
            dark
              ? "border-green-600 bg-green-100 hover:bg-green-600 text-green-800 hover:text-white"
              : "border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white",
            "rounded-full border-2 transition-colors focus:outline-none duration-300 flex text-lg px-4 py-2 items-center justify-center font-semibold"
          )}
          href={`${authEndpoint}?client_id=${spotify.clientId}&redirect_uri=${
            process.env.REDIRECT_URL
          }&scope=${scopes.join("%20")}&response_type=code&show_dialog=true`}
        >
          Login to Spotify
        </a>
      </div>
    </div>
  );
});
