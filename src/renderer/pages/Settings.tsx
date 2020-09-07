import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import { useMst } from "../models";
import Toggle from "../components/ui/Toggle";
import clsx from "clsx";

// TODO: parse the api key forms into separate small components to be reused in
// each options own settings screen (i.e. spotify settings vs lofi settings)

// TODO: add global theme toggle (light v dark)
export default observer(() => {
  const store = useMst();

  const { spotify, lofi } = store.player;

  const [theme, setTheme] = useState<string | null>(
    localStorage.getItem("theme")
  );

  function toggleTheme() {
    if (!theme || theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <div className={clsx(theme && theme === "dark" && "bg-dark", "h-screen")}>
      <Header title="Settings" dark={theme ? theme === "dark" : false} />
      <div className="p-6 flex flex-col space-y-5">
        <Toggle
          enabled={theme ? theme === "dark" : false}
          onToggle={toggleTheme}
          title="Dark Theme"
          dark={theme ? theme === "dark" : false}
        />
        <div>
          <label
            className={clsx(
              theme && theme === "dark" ? "text-white" : "text-gray-700",
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

        <div>
          <label
            className={clsx(
              theme && theme === "dark" ? "text-white" : "text-gray-700",
              "block text-sm leading-5 font-medium "
            )}
          >
            Google API Key
          </label>

          <input
            className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
            type="password"
            placeholder="Enter your google API key here"
            value={lofi.googleApiKey}
            onChange={(e) => lofi.setApiKey(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
});
