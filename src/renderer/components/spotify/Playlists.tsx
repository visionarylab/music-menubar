import React from "react";
import clsx from "clsx";
import { getTracks } from "../../api/spotify";
import { observer } from "mobx-react-lite";
import { useMst } from "../../models";

function Playlist({
  name,
  onClick,
  dark,
}: {
  name: string;
  onClick(): void;
  dark: boolean;
}) {
  return (
    <li
      onClick={onClick}
      className={clsx(
        dark ? "bg-dark hover:bg-gray-500" : "hover:bg-gray-100 ",
        "p-6 flex transition-colors duration-150 cursor-pointer"
      )}
    >
      <div className="flex-1">
        <div
          className={clsx(dark ? "text-white" : "text-gray-900", "font-bold")}
        >
          {name}
        </div>
      </div>
      <div className="flex items-center">
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={clsx(dark && "text-white", "w-6 ml-6")}
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </li>
  );
}

export default observer(
  ({
    playlists,
    dark,
    setPlaylist,
  }: {
    playlists: any;
    dark: boolean;
    setPlaylist: React.Dispatch<any>;
  }) => {
    const store = useMst();

    return (
      <ul
        className={clsx(
          dark ? "divide-gray-800" : "divide-gray-200",
          "divide-y "
        )}
      >
        {playlists.map((playlist: any) => {
          return (
            <Playlist
              key={playlist.name}
              name={playlist.name}
              onClick={() =>
                getTracks(
                  store.player.spotify.token!,
                  playlist.tracks.href,
                  setPlaylist
                )
              }
              dark={dark}
            />
          );
        })}
      </ul>
    );
  }
);
