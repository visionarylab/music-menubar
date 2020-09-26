import React from "react";
import { observer } from "mobx-react-lite";
import Header from "../../components/Header";
import { useMst } from "../../models";
import { useParams } from "react-router-dom";
import clsx from "clsx";

export default observer(() => {
  const store = useMst();
  const index = useParams().index;

  const dark = store.player.theme === "dark";

  const playlist = store.player.youtube.playlists[parseInt(index, 10)];

  return (
    <div className={clsx(dark && "bg-dark", "h-screen")}>
      <Header back="/youtube" title={`${playlist.name} Settings`} dark={dark} />
      <div className="p-6 flex flex-col space-y-5">
        <div>
          <label
            className={clsx(
              dark ? "text-white" : "text-gray-700",
              "block text-sm leading-5 font-medium "
            )}
          >
            Playlist Name
          </label>

          <input
            className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
            placeholder="Enter your client ID here"
            value={playlist.name}
            onChange={(e) => playlist.changeName(e.target.value)}
          />
        </div>

        <div>
          <label
            className={clsx(
              dark ? "text-white" : "text-gray-700",
              "block text-sm leading-5 font-medium "
            )}
          >
            Playlist ID
          </label>

          <input
            className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
            placeholder="Enter your client ID here"
            value={playlist.playlistId}
            onChange={(e) => playlist.setPlaylistId(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
});
