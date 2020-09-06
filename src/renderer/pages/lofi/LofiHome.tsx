import React from "react";
import { observer } from "mobx-react-lite";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useMst } from "../../models";
// import CreatePlaylistModal from "../../components/CreatePlaylistModal";

function LofiItem({
  to,
  name,
  onDelete,
}: {
  to: string;
  name: string;
  onDelete(): void;
}) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(to);
      }}
      className="p-6 flex hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
    >
      <div className="flex-1">
        <div className="font-bold text-gray-900">{name}</div>
        {/* <div className="text-gray-600">{description}</div> */}
      </div>
      <div className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-red-700"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="trash w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 ml-6"
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </li>
  );
}

// TODO: make dropdown selection for creating either stream or playlist viewer
export default observer(() => {
  const store = useMst();

  const { lofi } = store.player;
  const { playlists, streams } = lofi;

  return (
    <div>
      <Header title="Lofi" />
      <div className="px-6 py-2 flex justify-between">
        <h3>Playlists</h3>
        <button>+</button>
      </div>

      {/* <CreatePlaylistModal open={true} onClose={() => {}} /> */}

      <div className="divide-y overflow-y-scroll">
        <ul className="divide-y divide-gray-200">
          {playlists &&
            playlists.length > 0 &&
            playlists.map((playlist, index) => {
              return (
                <LofiItem
                  key={playlist.playlistId}
                  to={`/lofi/playlist/${index}`}
                  name={playlist.name}
                  onDelete={() => lofi.deletePlaylist(playlist)}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
});
