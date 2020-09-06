import React from "react";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import { useMst } from "../models";

// TODO: parse the api key forms into separate small components to be reused in
// each options own settings screen (i.e. spotify settings vs lofi settings)

// TODO: add global theme toggle (light v dark)
export default observer(() => {
  const store = useMst();

  const { spotify, lofi } = store.player;

  return (
    <React.Fragment>
      <Header title="Settings" />
      <div className="p-6 flex flex-col space-y-5">
        <div>
          <label className="block text-sm leading-5 font-medium text-gray-700">
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
          <label className="block text-sm leading-5 font-medium text-gray-700">
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
    </React.Fragment>
  );
});
